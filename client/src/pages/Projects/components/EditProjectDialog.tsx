import BootstrapDialog from "../../../sharedComponents/BootstrapDialog/BootstrapDialog";

import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";

import { useContext, useEffect, useState } from "react";
import { useAxiosPrivate } from "../../../hooks/useAxiosPrivate";
import ProjectModel, { Project } from "../models/ProjectModel";
import { ProjectsContext } from "../../../provider/ProjectsProvider";
import { ProjectActionType } from "../../../types/actions/projectTypes";

interface Props {
    open: boolean;
    handleClose: () => void;
    project: Project;
    updateProject: (project: ProjectModel) => void;
}

const EditProjectDialog: React.FC<Props> = ({ open, handleClose, project, updateProject }) => {
    const axiosPrivate = useAxiosPrivate();
    const { dispatch } = useContext(ProjectsContext);

    const [projectName, setProjectName] = useState("");
    useEffect(() => {
        setProjectName(project.name);
    }, [project.name]);

    const updateProjectHandler = async () => {
        try {
            const response = await axiosPrivate.put(`project/${project.id}`, { name: projectName });
            updateProject(response.data);
            dispatch({ type: ProjectActionType.UPDATE_PROJECT, payload: response.data });
            handleClose();
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <BootstrapDialog open={open} onClose={handleClose} maxWidth={"xs"} fullWidth>
            <DialogTitle>Edit Project</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}>
                <CloseIcon />
            </IconButton>
            <DialogContent dividers>
                <TextField
                    autoFocus
                    required
                    id="name"
                    name="project"
                    label="Project Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={projectName}
                    onChange={(e) => setProjectName(e.currentTarget.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={updateProjectHandler}>Edit</Button>
            </DialogActions>
        </BootstrapDialog>
    );
};

export default EditProjectDialog;
