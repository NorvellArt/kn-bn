import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosPublic } from "../../../api/axios";

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
        <form onSubmit={handleSubmit}>
            <h1>Sign Up</h1>

            <label htmlFor="email">Email</label>
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

            <button>Sign Up</button>

            <p>
                Already a user? <Link to={"/login"}>Log In</Link>
            </p>
        </form>
    );
};
