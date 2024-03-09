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
    const {
        project,
        openEditDialog,
        openDeleteDialog,
        handleOpenDeleteDialog,
        handleOpenEditDialog,
        handleCloseDeleteDialog,
        handleCloseEditDialog,
        updateProject,
    } = useContext(ProjectsContext);

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
                        onClick={handleOpenDeleteDialog}>
                        Delete
                    </Button>

                    <Button
                        variant="contained"
                        onClick={handleOpenEditDialog}
                        startIcon={<EditOutlinedIcon />}>
                        Edit
                    </Button>
                </Box>
            </Box>

            <EditProjectDialog
                open={openEditDialog}
                handleClose={handleCloseEditDialog}
                project={project}
                updateProject={updateProject}
            />

            <DeleteConfirmationDialog
                open={openDeleteDialog}
                handleClose={handleCloseDeleteDialog}
                project={project}
            />
        </>
    );
};

export default ProjectHeader;
