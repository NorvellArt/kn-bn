import { useCallback } from "react";
import { useAuth } from "./useAuth";
import { LOGOUT_SUCCESS } from "../types/actions/authTypes";
import { useAxiosPrivate } from "./useAxiosPrivate";

// hook that returns a logout function
export const useLogout = () => {
    const { dispatch } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const logout = useCallback(async () => {
        await axiosPrivate.get("auth/logout");
        dispatch({ type: LOGOUT_SUCCESS });
    }, [dispatch, axiosPrivate]);

    return logout;
};
