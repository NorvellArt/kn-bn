import { useContext } from "react";
import { LayoutContext } from "../provider/LayoutProvider";

export const useLayout = () => {
    return useContext(LayoutContext);
};