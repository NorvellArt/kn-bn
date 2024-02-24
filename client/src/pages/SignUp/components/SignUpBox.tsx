import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosPublic } from "../../../api/axios";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import HowToRegOutlined from "@mui/icons-material/HowToRegOutlined";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export const SignupBox = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await axiosPublic.post("auth/register", { email, password });
        setPassword("");
        setEmail("");
        navigate("/login");
    };

    //no validation
    return (
        <Box
            sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <HowToRegOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign Up
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />

                <Button fullWidth type="submit" variant="contained" sx={{ mt: 2, mb: 2 }}>
                    Sign Up
                </Button>

                <Box
                    sx={{
                        textAlign: "center",
                    }}>
                    Already a user? <Link to={"/login"}>Log In</Link>
                </Box>
            </Box>
        </Box>
    );
};
