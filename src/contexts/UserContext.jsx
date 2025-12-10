import { createContext, useState } from "react";
import useRequest from "../hooks/useRequest";
import usePersistedState from "../hooks/usePersistedState";

const UserContext = createContext({
    isAuthenticated: false,
    user: {
        email: "",
        password: "",
        _createdOn: 0,
        _id: "",
        accessToken: "",
    },
    registerHandler() { },
    loginHandler() { }, 
    logoutHandler() { },
});

export function UserProvider({
    children
}) {
    const [user, setUser] = usePersistedState(null);
    const { request } = useRequest();

    const registerHandler = async (email, password) => {
        const newUser = { email, password };

        const result = await request(`${import.meta.env.VITE_APP_SERVER_URL}/users/register`, "POST", newUser);

        setUser(result);
    }

    const loginHandler = async (email, password) => {
        const result = await request(`${import.meta.env.VITE_APP_SERVER_URL}/users/login`, "POST", { email, password });

        setUser(result);
    }

    const logoutHandler = async () => {
        const accessToken = user?.accessToken;
        if (!accessToken) {
            setUser(null);
            return;
        }
        return request(`${import.meta.env.VITE_APP_SERVER_URL}/users/logout`, "GET", null, { accessToken })
            .finally(() => setUser(null));
    }   

    const userContextValues = {
        user,
        isAuthenticated: !!user?.accessToken,
        registerHandler,
        loginHandler,
        logoutHandler
    }

    return(
        <UserContext.Provider value={userContextValues}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext;