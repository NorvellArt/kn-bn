import { useProjects } from "../../hooks/useProjects";
import { ProjectsProvider } from "../../provider/ProjectsProvider";
import ProjectsTable from "./components/ProjectsTable";
import ProjectsControl from "./components/ProjectsControl";

const ProjectsComponent: React.FC = () => {
    const { projects } = useProjects();

    return (
        <>
            <ProjectsControl />
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
