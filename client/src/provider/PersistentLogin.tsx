import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useRefreshToken } from "../hooks/useRefreshToken";
import { ChildrenProps } from "../types/props";
import {
    PERSISTENT_LOGIN_FAIL,
    PERSISTENT_LOGIN_LOADING,
    PERSISTENT_LOGIN_SUCCESS,
} from "../types/actions/authTypes";
import { Loading } from "../components/Loading";

export const PersistentLogin = ({ children }: ChildrenProps) => {
    const { auth, dispatch } = useAuth();
    const refresh = useRefreshToken();

    useEffect(() => {
        const persistentLogin = async () => {
            dispatch({ type: PERSISTENT_LOGIN_LOADING });

            const data = await refresh();
            if (data) {
                return dispatch({
                    type: PERSISTENT_LOGIN_SUCCESS,
                    payload: { ...data },
                });
            }
            return dispatch({ type: PERSISTENT_LOGIN_FAIL });
        };
        persistentLogin();
    }, [dispatch, refresh]);

    if (!auth.isAppLoaded) {
        return <Loading />; // TODO: Подумать как избавиться от глобальной загрузки
    }

    return <>{children}</>;
};
