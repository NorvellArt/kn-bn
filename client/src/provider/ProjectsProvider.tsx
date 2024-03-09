import { Dispatch, createContext, useReducer, useState } from "react";
import { ChildrenProps } from "../types/props";
import { ProjectActionType } from "../types/actions/projectTypes";

import ProjectModel, { Project } from "../pages/Projects/models/ProjectModel";

interface ProjectsContextType {
    projects: Project[];
    project: ProjectModel;

    dispatch: Dispatch<Action>;
    updateProject: (project: ProjectModel) => void;

    openCreationDialog: boolean;
    openEditDialog: boolean;
    openDeleteDialog: boolean;
    handleOpenCreationDialog: () => void;
    handleCloseCreationDialog: () => void;
    handleOpenEditDialog: () => void;
    handleCloseEditDialog: () => void;
    handleOpenDeleteDialog: () => void;
    handleCloseDeleteDialog: () => void;
}

interface Action {
    type: ProjectActionType;
    payload: Project | Project[]; // TODO: Это не есть хорошо
}

export const ProjectsContext = createContext({} as ProjectsContextType);

export const ProjectsProvider = ({ children }: ChildrenProps) => {
    const [projects, dispatch] = useReducer(reducer, []);
    const [project, setProject] = useState<ProjectModel>({} as ProjectModel);

    const [openCreationDialog, setOpenCreationDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const handleOpenCreationDialog = () => {
        setOpenCreationDialog(true);
    };
    const handleCloseCreationDialog = () => {
        setOpenCreationDialog(false);
    };
    const handleOpenEditDialog = () => {
        setOpenEditDialog(true);
    };
    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
    };
    const handleOpenDeleteDialog = () => {
        setOpenDeleteDialog(true);
    };
    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };

    const updateProject = (project: Project) => {
        setProject(new ProjectModel(project));
    };

    const providerValue = {
        projects,
        project,

        dispatch,
        updateProject,

        openCreationDialog,
        openEditDialog,
        openDeleteDialog,
        handleOpenCreationDialog,
        handleCloseCreationDialog,
        handleOpenEditDialog,
        handleCloseEditDialog,
        handleOpenDeleteDialog,
        handleCloseDeleteDialog,
    };

    return <ProjectsContext.Provider value={providerValue}>{children}</ProjectsContext.Provider>;
};

const reducer = (projects: Project[], action: Action) => {
    const { type, payload } = action;

    switch (type) {
        case ProjectActionType.LOAD_PROJECTS: {
            if (Array.isArray(payload)) {
                return payload;
            }
            return projects;
        }
        case ProjectActionType.CREATE_PROJECT: {
            if (!Array.isArray(payload)) {
                return [...projects, payload];
            }
            return projects;
        }
        case ProjectActionType.DELETE_PROJECT: {
            if (!Array.isArray(payload)) {
                return projects.filter((project) => project.id !== payload.id);
            }
            return projects;
        }
        case ProjectActionType.UPDATE_PROJECT: {
            if (!Array.isArray(payload)) {
                return projects.map((project) => (project.id === payload.id ? payload : project));
            }
            return projects;
        }
        default:
            return projects;
    }
};
