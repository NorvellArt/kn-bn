import { useContext, useState } from "react";
import { useAxiosPrivate } from "../../../hooks/useAxiosPrivate";

import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { ProjectActionType } from "../../../types/actions/projectTypes";
import BootstrapDialog from "../../../sharedComponents/BootstrapDialog/BootstrapDialog";
import { ProjectsContext } from "../../../provider/ProjectsProvider";

interface Props {
    open: boolean;
    handleClose: () => void;
}

const CreateProjectDialog: React.FC<Props> = ({ open, handleClose }) => {
    const [projectName, setProjectName] = useState("");
    const axiosPrivate = useAxiosPrivate();

    const { dispatch } = useContext(ProjectsContext);

    const createProjectHandler = async () => {
        try {
            const response = await axiosPrivate.post("project", { name: projectName });

            dispatch({
                type: ProjectActionType.CREATE_PROJECT,
                payload: response.data,
            });

            handleClose();
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <BootstrapDialog open={open} onClose={handleClose} maxWidth={"xs"} fullWidth>
            <DialogTitle>Create a new Project</DialogTitle>
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
                <Button disabled={projectName.length === 0} onClick={createProjectHandler}>
                    Create
                </Button>
            </DialogActions>
        </BootstrapDialog>
    );
};

export default CreateProjectDialog;
