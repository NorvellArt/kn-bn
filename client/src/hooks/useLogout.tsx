import { useCallback } from "react";
import { useAuth } from "./useAuth";
import { LOGOUT_SUCCESS } from "../types/actions/authTypes";
import { axiosPrivate } from "../api/axios";

// hook that returns a logout function
export const useLogout = () => {
    const { dispatch } = useAuth();

    const logout = useCallback(async () => {
        await axiosPrivate.get("auth/logout");
        dispatch({ type: LOGOUT_SUCCESS });
    }, [dispatch]);

    return logout;
};
