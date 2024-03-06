import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ProjectModel from "../models/ProjectModel";
import { SxProps } from "@mui/material/styles";

interface Props {
    project: ProjectModel;
}

interface ProjectField {
    label: string;
    value: string;
    styles: SxProps;
}

const ProjectInfo: React.FC<Props> = ({ project }) => {
    const displayProject = project.getProjectModel();

    const projectFields: ProjectField[] = [
        {
            label: "Project name:\u00A0",
            value: displayProject.name,
            styles: {
                m: 8,
            },
        },
        {
            label: "Created at:\u00A0",
            value: displayProject.createdAt.toLocaleString(),
            styles: {
                m: 8,
            },
        },
        {
            label: "Updated at:\u00A0",
            value: displayProject.updatedAt.toLocaleString(),
            styles: {
                m: 8,
            },
        },
    ];

    const getProjectField = (fields: ProjectField[]) => {
        return fields.map((field) => {
            console.log({ field });
            return (
                <Box key={field.label} display={"flex"} sx={field.styles}>
                    <Typography variant="subtitle2" sx={{ fontSize: 20 }}>
                        {field.label}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: 20 }}>
                        {field.value}
                    </Typography>
                </Box>
            );
        });
    };

    return (
        <>
            <Paper variant="outlined" sx={{ height: 400, mt: 2 }}>
                {getProjectField(projectFields)}
            </Paper>
        </>
    );
};

export default ProjectInfo;
