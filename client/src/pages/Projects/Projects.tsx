import { Outlet } from "react-router-dom";
import { ProjectsContext, ProjectsProvider } from "../../provider/ProjectsProvider";
import { ProjectActionType } from "../../types/actions/projectTypes";

import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { useContext, useEffect } from "react";

const ProjectsComponent: React.FC = () => {
    const axiosPrivate = useAxiosPrivate();
    const { dispatch } = useContext(ProjectsContext);

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

    return <Outlet />;
};

const Projects = () => {
    return (
        <ProjectsProvider>
            <ProjectsComponent />
        </ProjectsProvider>
    );
};

export default Projects;
