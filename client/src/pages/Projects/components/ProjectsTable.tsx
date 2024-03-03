import { Project } from "../../../types/models/Projects";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

interface Props {
    projects: Project[];
}

interface Column {
    id: "id" | "name";
    label: string;
    align?: "right" | "left";
}

const columns: Column[] = [
    { id: "id", label: "ID" },
    { id: "name", label: "Name" },
];

const ProjectsTable: React.FC<Props> = ({ projects }) => {
    return (
        <Paper sx={{ width: "100%", overflow: "hidden", mt: 2 }} elevation={4}>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.id}>{column.label}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {projects.map((project) => {
                            return (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={project.id}
                                    sx={{ cursor: "pointer" }}
                                    onClick={() => console.log("TODO: добавить коллбек для открытия проекта", project.id)}>
                                    {columns.map(({ id }) => (
                                        <TableCell key={id}> {project[id]} </TableCell>
                                    ))}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default ProjectsTable;
