import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import ProjectModel from "./models/ProjectModel";
import ProjectHeader from "./components/ProjectHeader";
import { Loading } from "../../components/Loading";
import ProjectInfo from "./components/ProjectInfo";
import { ProjectsProvider } from "../../provider/ProjectsProvider";

const ProjectItemComponent: React.FC = () => {
    const { id } = useParams();
    const axiosPrivate = useAxiosPrivate();

    const [project, setProject] = useState<ProjectModel>({} as ProjectModel);

    const updateProject = (project: ProjectModel) => {
        setProject(new ProjectModel(project));
    };

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
    }, [id, axiosPrivate]);

    return (
        <>
            {project.id ? (
                <>
                    <ProjectHeader project={project} updateProject={updateProject} />
                    <ProjectInfo project={project} />
                </>
            ) : (
                <Loading />
            )}
        </>
    );
};

const ProjectItem = () => {
    return (
        <ProjectsProvider>
            <ProjectItemComponent />
        </ProjectsProvider>
    );
};

export default ProjectItem;
