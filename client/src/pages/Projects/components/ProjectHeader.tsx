import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import EditProjectDialog from "./EditProjectDialog";
import { Project } from "../../../types/models/Projects";
import ProjectModel from "../models/ProjectModel";

interface Props {
    project: Project;
    updateProject: (project: ProjectModel) => void;
}

const ProjectHeader: React.FC<Props> = ({ project, updateProject }) => {
    const [open, setOpen] = useState(false);
    const navigation = useNavigate();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                    <Button variant="outlined" startIcon={<DeleteIcon />}>
                        Delete
                    </Button>

                    <Button
                        variant="contained"
                        onClick={handleClickOpen}
                        startIcon={<EditOutlinedIcon />}>
                        Edit
                    </Button>
                </Box>
            </Box>

            <EditProjectDialog
                open={open}
                handleClose={handleClose}
                project={project}
                updateProject={updateProject}
            />
        </>
    );
};

export default ProjectHeader;
