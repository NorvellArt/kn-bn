import { createContext, useReducer, Dispatch } from "react";
import * as authTypes from "../types/actions/authTypes";
import { ChildrenProps } from "../types/props";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
    auth: any;
    dispatch: Dispatch<any>;
}

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: ChildrenProps) => {
    const [auth, dispatch] = useReducer(reducer, {
        isAuthenticated: false,
        isLoading: true,
        user: {},
        isApploaded: false,
    });

    console.log(auth);

    return <AuthContext.Provider value={{ auth, dispatch }}>{children}</AuthContext.Provider>;
};

const reducer = (auth: any, action: any) => {
    
    console.log('auth', auth)
    console.log('action', action)
    

    switch (action.type) {
        case authTypes.LOGIN_WITH_USERNAME_SUCCESS:
        case authTypes.REFRESH_ACCESS_TOKEN:
            return {
                ...auth,
                isLoading: false,
                isAppLoaded: true,
                isAuthenticated: true,
                user: jwtDecode(action.payload.accessToken),
            };

        case authTypes.LOGOUT_SUCCESS:
            return { ...auth, isAuthenticated: false, user: {} };

        case authTypes.UPDATE_USER_LOADING:
            return { ...auth, isLoading: true };

        case authTypes.UPDATE_USER_SUCCESS:
            return {
                ...auth,
                user: jwtDecode(action.payload.accessToken),
                isLoading: false,
                isAuthenticated: true,
            };

        case authTypes.DELETE_USER_SUCCESS:
            return {
                ...auth,
                isLoading: false,
                isAuthenticated: false,
                user: {},
            };

        case authTypes.PERSISTENT_LOGIN_LOADING:
            return { ...auth, isLoading: true, isAppLoaded: false };

        case authTypes.PERSISTENT_LOGIN_FAIL:
            return {
                ...auth,
                isLoading: false,
                isAuthenticated: false,
                isAppLoaded: true,
            };

        case authTypes.PERSISTENT_LOGIN_SUCCESS:
            return {
                ...auth,
                isLoading: false,
                isAppLoaded: true,
                isAuthenticated: true,
                user: jwtDecode(action.payload.accessToken),
            };
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
};
