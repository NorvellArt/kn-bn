import { useContext } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

import CreateProjectDialog from "./CreateProjectDialog";
import { ProjectsContext } from "../../../provider/ProjectsProvider";

const ProjectsControl: React.FC = () => {
    const { openModal, toggleModal } = useContext(ProjectsContext);

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
                    onClick={() => toggleModal("create")}
                    startIcon={<AddOutlinedIcon />}>
                    Create New Project
                </Button>
            </Box>

            <CreateProjectDialog
                open={openModal.create}
                handleClose={() => toggleModal("create")}
            />
        </>
    );
};

export default ProjectsControl;
