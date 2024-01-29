import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Layout } from "./components/Layout";
import { RequireAuth } from "./components/RequireAuth";

import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { Signup } from "./pages/SignUp/SignUp";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Admin } from "./pages/Admin/Admin";
import { Error } from "./pages/Error/Error";

import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                    <Route element={<RequireAuth allowedRoles={["user"]} />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Route>

                    <Route element={<RequireAuth allowedRoles={["admin"]} />}>
                        <Route path="/admin" element={<Admin />} />
                    </Route>
                </Route>

                <Route path="/unauthorized" element={<Error />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
