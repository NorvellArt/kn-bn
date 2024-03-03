import { Dispatch, createContext, useReducer } from "react";
import { ChildrenProps } from "../types/props";
import { ProjectActionType } from "../types/actions/projectTypes";
import { Project } from "../types/models/Projects";

interface ProjectsContextType {
    projects: Project[];
    dispatch: Dispatch<Action>
}

interface Action {
    type: ProjectActionType;
    payload: Project | Project[]; // TODO: Это не есть хорошо
}

export const ProjectsContext = createContext({} as ProjectsContextType);

export const ProjectsProvider = ({ children }: ChildrenProps) => {
    const [projects, dispatch] = useReducer(reducer, []);

    return <ProjectsContext.Provider value={{ projects, dispatch }}>{children}</ProjectsContext.Provider>;
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
        default:
            return projects;
    }
};
