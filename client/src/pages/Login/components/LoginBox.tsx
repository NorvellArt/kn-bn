import { Link, useLocation, useNavigate } from "react-router-dom";
import { axiosPublic } from "../../../api/axios";
import { LOGIN_WITH_USERNAME_SUCCESS } from "../../../types/actions/authTypes";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";

export const LoginBox = () => {
    const { dispatch } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || "/";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await axiosPublic.post("auth/login", {
            email,
            password,
        });

        const accessToken = response?.data?.accessToken;

        if (accessToken) {
            dispatch({
                type: LOGIN_WITH_USERNAME_SUCCESS,
                payload: { ...response?.data },
            });

            setPassword("");
            setEmail("");
            navigate(from, { replace: true });
        }
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
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Login
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
                    Log In
                </Button>

                <Box
                    sx={{
                        textAlign: "center",
                    }}>
                    Don&#39;t have an account? <Link to={"/signup"}>Sign Up</Link>
                </Box>
            </Box>
        </Box>
    );
};
