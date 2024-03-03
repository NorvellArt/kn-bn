import { useProjects } from "../../hooks/useProjects";
import { ProjectsProvider } from "../../provider/ProjectsProvider";
import ProjectsTable from "./components/ProjectsTable";

const ProjectsComponent = () => {
    const { projects } = useProjects();

    return (
        <>
            <ProjectsTable projects={projects} />
        </>
    );
};

const Projects = () => {
    return (
        <ProjectsProvider>
            <ProjectsComponent />
        </ProjectsProvider>
    );
};

export default Projects;
