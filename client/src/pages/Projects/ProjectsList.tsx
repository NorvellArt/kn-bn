import ProjectsTable from "./components/ProjectsTable";
import ProjectsControl from "./components/ProjectsControl";
import { useContext } from "react";
import { ProjectsContext } from "../../provider/ProjectsProvider";

const ProjectsList: React.FC = () => {
    const { projects } = useContext(ProjectsContext);
   
    return (
        <>
            <ProjectsControl />
            <ProjectsTable projects={projects} />
        </>
    );
};

export default ProjectsList;
