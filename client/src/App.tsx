import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Layout } from "./components/Layout";
import { RequireAuth } from "./components/RequireAuth";

import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { Signup } from "./pages/SignUp/SignUp";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Admin } from "./pages/Admin/Admin";
import { Error } from "./pages/Error/Error";
import CssBaseline from "@mui/material/CssBaseline";

import "./App.css";

function App() {
    return (
        <>
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>

                        <Route element={<RequireAuth allowedRoles={["USER", "ADMIN"]} />}>
                            <Route path="/dashboard" element={<Dashboard />} />
                        </Route>

                        <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
                            <Route path="/admin" element={<Admin />} />
                        </Route>
                    </Route>

                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                    <Route path="/unauthorized" element={<Error />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
