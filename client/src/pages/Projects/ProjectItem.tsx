import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import ProjectHeader from "./components/ProjectHeader";
import { Loading } from "../../components/Loading";
import ProjectInfo from "./components/ProjectInfo";

import { ProjectsContext } from "../../provider/ProjectsProvider";

const ProjectItem: React.FC = () => {
    const { id } = useParams();
    const axiosPrivate = useAxiosPrivate();

    const { project, updateProject } = useContext(ProjectsContext);

    useEffect(() => {
        async function fetching() {
            try {
                const result = await axiosPrivate.get(`project/${id}`);
                updateProject(result.data);
            } catch (e) {
                console.log(e);
            }
        }
        fetching();
    }, []);

    return (
        <>
            {project.id ? (
                <>
                    <ProjectHeader />
                    <ProjectInfo project={project} />
                </>
            ) : (
                <Loading />
            )}
        </>
    );
};

export default ProjectItem;
