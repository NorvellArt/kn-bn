import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import { RequireAuth } from "./components/RequireAuth";

import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { Signup } from "./pages/SignUp/SignUp";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Admin } from "./pages/Admin/Admin";
import { Error } from "./pages/Error/Error";
import ProjectsList from "./pages/Projects/ProjectsList";
import ProjectItem from "./pages/Projects/ProjectItem";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import Projects from "./pages/Projects/Projects";

const globalStyles = {
    body: { backgroundColor: "#F8F8F8" },
};

function App() {
    return (
        <>
            <CssBaseline />
            <GlobalStyles styles={globalStyles} />
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
                        <Route element={<RequireAuth allowedRoles={["USER", "ADMIN"]} />}>
                            <Route path="/dashboards" element={<Dashboard />} />
                            <Route path="/projects" element={<Projects />}>
                                <Route path="" element={<ProjectsList />} />
                                <Route path=":id" element={<ProjectItem />} />
                            </Route>
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
