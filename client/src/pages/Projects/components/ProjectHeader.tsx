import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

interface Props {
    name: string;
}

const ProjectHeader: React.FC<Props> = ({ name }) => {
    return (
        <>
            <Box display={"flex"} justifyContent={"space-between"} sx={{ mt: 3 }}>
                <Typography variant="h6" component="div">
                    {`Project: ${name}`}
                </Typography>
                <Button variant="contained" onClick={() => console.log('Open Edit')} startIcon={<EditOutlinedIcon />}>
                    Edit
                </Button>
            </Box>
        </>
    );
};

export default ProjectHeader;
