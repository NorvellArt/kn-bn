import { useContext, useEffect } from "react";
import { ProjectsContext } from "../provider/ProjectsProvider";
import { ProjectActionType } from "../types/actions/projectTypes";
import { useAxiosPrivate } from "./useAxiosPrivate";

export const useProjects = () => {
    const { dispatch } = useContext(ProjectsContext);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        async function fetching() {
            try {
                const response = await axiosPrivate("/project", { withCredentials: true });

                dispatch({
                    type: ProjectActionType.LOAD_PROJECTS,
                    payload: response.data,
                });
            } catch (e) {
                console.log(e);
            }
        }

        fetching();
    }, [dispatch, axiosPrivate]);

    return useContext(ProjectsContext);
};
