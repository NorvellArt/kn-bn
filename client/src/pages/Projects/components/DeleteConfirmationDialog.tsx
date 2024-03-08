import React from "react";
import { useNavigate } from "react-router-dom";

import BootstrapDialog from "../../../sharedComponents/BootstrapDialog/BootstrapDialog";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { Project } from "../../../types/models/Projects";
import { ProjectActionType } from "../../../types/actions/projectTypes";

import { useAxiosPrivate } from "../../../hooks/useAxiosPrivate";
import { useProjects } from "../../../hooks/useProjects";

interface Props {
    open: boolean;
    handleClose: () => void;
    project: Project;
}

const DeleteConfirmationDialog: React.FC<Props> = ({ open, handleClose, project }) => {
    const axiosPrivate = useAxiosPrivate();
    const { dispatch } = useProjects();
    const navigate = useNavigate()

    const deleteHandler = async () => {
        try {
            const response = await axiosPrivate.delete(`project/${project.id}`);

            dispatch({ type: ProjectActionType.DELETE_PROJECT, payload: response.data });
            handleClose();
            navigate('/projects');
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <BootstrapDialog open={open} onClose={handleClose} maxWidth={"xs"} fullWidth>
            <DialogTitle>Confirm deletion</DialogTitle>
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
            <DialogContent dividers>{`Delete project "${project.name}"?`}</DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={deleteHandler} color="error">
                    Delete
                </Button>
            </DialogActions>
        </BootstrapDialog>
    );
};

export default DeleteConfirmationDialog;
