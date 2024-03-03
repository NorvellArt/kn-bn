import { createContext, useCallback, useState } from "react";
import { ChildrenProps } from "../types/props";
import { useLocation, useNavigate } from "react-router-dom";
import { capitalizeFirstLetter } from "../utils/String";

export interface DrawerItem {
    text: string;
    onClick: () => void;
    selected: boolean;
}

interface LayoutContextType {
    open: boolean;
    drawerItems: DrawerItem[];

    currentPage: () => string;
    toggleDrawer: () => void;
}

const Pages = {
    DASHBOARDS: 'Dashboards',
    PROJECTS: 'Projects',
} as const;

export const LayoutContext = createContext({} as LayoutContextType);

export const LayoutProvider = ({ children }: ChildrenProps) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [open, setOpen] = useState(false);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const onDrawerItemClick = (path: string) => {
        navigate(path);
        toggleDrawer();
    };

    const currentPage = useCallback(() => capitalizeFirstLetter(pathname.slice(1)), [pathname]);

    const isSelected = useCallback((path: string) => path === currentPage(), [currentPage]);

    const drawerItems: DrawerItem[] = [
        {
            text: Pages.DASHBOARDS,
            onClick: () => onDrawerItemClick("/dashboards"),
            selected: isSelected(Pages.DASHBOARDS),
        },
        {
            text: Pages.PROJECTS,
            onClick: () => onDrawerItemClick("/projects"),
            selected: isSelected(Pages.PROJECTS),
        },
    ];

    return (
        <LayoutContext.Provider value={{ open, drawerItems, toggleDrawer, currentPage }}>
            {children}
        </LayoutContext.Provider>
    );
};
