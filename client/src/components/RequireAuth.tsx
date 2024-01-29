import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

type Role = "admin" | "user";

type AllowedRoles = Array<Role>;

// component checks if user is authenticated and has the appropriate role to access the child route
export const RequireAuth = ({ allowedRoles }: { allowedRoles: AllowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return auth?.user?.roles?.find((role: Role) => allowedRoles?.includes(role)) ? (
        <Outlet />
    ) : auth?.isAuthenticated ? (
        <Navigate to={"/unauthorized"} state={{ from: location }} replace />
    ) : (
        <Navigate to={"/login"} state={{ from: location }} replace />
    );
};
