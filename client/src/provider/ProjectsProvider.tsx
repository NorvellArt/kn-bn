import { Dispatch, createContext, useReducer, useState } from "react";
import { ChildrenProps } from "../types/props";
import { ProjectActionType } from "../types/actions/projectTypes";

import ProjectModel, { Project } from "../pages/Projects/models/ProjectModel";

interface ProjectsContextType {
    projects: Project[];
    project: ProjectModel;

    dispatch: Dispatch<Action>;
    updateProject: (project: ProjectModel) => void;

    openModal: {
        edit: boolean;
        create: boolean;
        delete: boolean;
    };
    toggleModal: (modal: ModalType) => void;
}

interface Action {
    type: ProjectActionType;
    payload: Project | Project[]; // TODO: Это не есть хорошо
}

type ModalType = "edit" | "create" | "delete";

export const ProjectsContext = createContext({} as ProjectsContextType);

export const ProjectsProvider = ({ children }: ChildrenProps) => {
    const [projects, dispatch] = useReducer(reducer, []);
    const [project, setProject] = useState<ProjectModel>({} as ProjectModel);

    const [openModal, setOpenModal] = useState({
        edit: false,
        create: false,
        delete: false,
    });

    const toggleModal = (modal: ModalType) => {
        setOpenModal({ ...openModal, [modal]: !openModal[modal] });
    };

    const updateProject = (project: Project) => {
        setProject(new ProjectModel(project));
    };

    const providerValue = {
        projects,
        project,

        dispatch,
        updateProject,

        openModal,
        toggleModal,
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
