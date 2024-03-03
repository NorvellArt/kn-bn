import { useProjects } from "../../hooks/useProjects";
import { ProjectsProvider } from "../../provider/ProjectsProvider";

const ProjectsComponent = () => {
    const { projects } = useProjects();

    return (
        <div>
            {projects.map((project) => {
                return <div key={project.id}>{project.name}</div>;
            })}
        </div>
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
