import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import ProjectModel from "./models/ProjectModel";
import ProjectHeader from "./components/ProjectHeader";
import { Loading } from "../../components/Loading";
import ProjectInfo from "./components/ProjectInfo";

const ProjectItem: React.FC = () => {
    const { id } = useParams();
    const axiosPrivate = useAxiosPrivate();

    const [project, setProject] = useState<ProjectModel>({} as ProjectModel);

    useEffect(() => {
        async function fetching() {
            try {
                const result = await axiosPrivate.get(`project/${id}`);
                setProject(new ProjectModel(result.data));
            } catch (e) {
                console.log(e);
            }
        }
        fetching();
    }, [id, axiosPrivate]);

    return (
        <>
            {project.id ? (
                <>
                    <ProjectHeader name={project.name} />
                    <ProjectInfo project={project} />
                </>
            ) : (
                <Loading />
            )}
        </>
    );
};

export default ProjectItem;
