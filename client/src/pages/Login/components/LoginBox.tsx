import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { axiosPublic } from "../../../api/axios";
import { useAuth } from "../../../hooks/useAuth";
import { LOGIN_WITH_USERNAME_SUCCESS } from "../../../types/actions/authTypes";

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
        <form onSubmit={handleSubmit}>
            <h1>Log In</h1>

            <label htmlFor="Email">Email</label>
            <input
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
                type="email"
                name="email"
                id="email"
            />

            <label htmlFor="password">Password</label>
            <input
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
                type="password"
                name="password"
                id="password"
            />

            <button>Log In</button>
            <Link to={"/settings"}>Forgot Password?</Link>

            <p>
                Don&#39;t have an account? <Link to={"/signup"}>Sign Up</Link>
            </p>
        </form>
    );
};
