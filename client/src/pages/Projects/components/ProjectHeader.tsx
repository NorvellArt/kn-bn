import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import EditProjectDialog from "./EditProjectDialog";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import { ProjectsContext } from "../../../provider/ProjectsProvider";

const ProjectHeader: React.FC = () => {
    const navigation = useNavigate();
    const { project, updateProject, openModal, toggleModal } = useContext(ProjectsContext);

    return (
        <>
            <Box display={"flex"} justifyContent={"space-between"} sx={{ mt: 3 }}>
                <Box display={"flex"} gap={2} alignItems={"center"}>
                    <IconButton onClick={() => navigation("/projects")}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" component="div">
                        {`Project: ${project.name}`}
                    </Typography>
                </Box>

                <Box display={"flex"} gap={2} alignItems={"center"}>
                    <Button
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        onClick={() => toggleModal("delete")}>
                        Delete
                    </Button>

                    <Button
                        variant="contained"
                        onClick={() => toggleModal("edit")}
                        startIcon={<EditOutlinedIcon />}>
                        Edit
                    </Button>
                </Box>
            </Box>

            <EditProjectDialog
                open={openModal.edit}
                handleClose={() => toggleModal("edit")}
                project={project}
                updateProject={updateProject}
            />

            <DeleteConfirmationDialog
                open={openModal.delete}
                handleClose={() => toggleModal("delete")}
                project={project}
            />
        </>
    );
};

export default ProjectHeader;
