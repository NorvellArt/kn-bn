import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export const Home = () => {
    return (
        <div>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}>
                    <Typography component="h1" variant="h5">
                        Welcome!
                    </Typography>
                    
                    <Box
                        sx={{
                            textAlign: "center",
                            mt: 2
                        }}>
                        Go to <Link to={"/dashboards"}>Dashboards</Link>
                    </Box>
                </Box>
            </Container>
        </div>
    );
};
