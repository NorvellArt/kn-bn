import { useCallback } from "react";
import { LOGOUT_SUCCESS, REFRESH_ACCESS_TOKEN } from "../types/actions/authTypes";
import { axiosPublic } from "../api/axios";
import { useAuth } from "./useAuth";

export const useRefreshToken = () => {
  const { dispatch } = useAuth();

  const refresh = useCallback(async () => {
    try {
      const response = await axiosPublic.get("auth/refresh-tokens", {
        withCredentials: true,
      });

      dispatch({
        type: REFRESH_ACCESS_TOKEN,
        payload: { accessToken: response?.data?.accessToken },
      });

      return { ...response?.data };
    } catch (err) {
      if (err?.response?.status === 403) {
        dispatch({ type: LOGOUT_SUCCESS });
        return;
      }
    }
  }, [dispatch]);
  return refresh;
};