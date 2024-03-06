import { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

import CreateProjectDialog from "./CreateProjectDialog";

const ProjectsControl: React.FC = () => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Box display={"flex"} justifyContent={"space-between"} sx={{ mt: 3 }}>
                <Typography variant="h6" component="div">
                    Projects Table
                </Typography>
                <Button
                    variant="contained"
                    onClick={handleClickOpen}
                    startIcon={<AddOutlinedIcon />}>
                    Create New Project
                </Button>
            </Box>

            <CreateProjectDialog open={open} handleClose={handleClose} />
        </>
    );
};

export default ProjectsControl;
