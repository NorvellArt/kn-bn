import { useContext } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

import CreateProjectDialog from "./CreateProjectDialog";
import { ProjectsContext } from "../../../provider/ProjectsProvider";

const ProjectsControl: React.FC = () => {
    const { handleOpenCreationDialog, handleCloseCreationDialog, openCreationDialog } =
        useContext(ProjectsContext);

    return (
        <>
            <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                sx={{ mt: 3 }}>
                <Typography variant="h6" component="div">
                    Projects Table
                </Typography>
                <Button
                    variant="contained"
                    onClick={handleOpenCreationDialog}
                    startIcon={<AddOutlinedIcon />}>
                    Create New Project
                </Button>
            </Box>

            <CreateProjectDialog
                open={openCreationDialog}
                handleClose={handleCloseCreationDialog}
            />
        </>
    );
};

export default ProjectsControl;
