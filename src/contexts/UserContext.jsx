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

        const result = await request("http://127.0.0.1:5001/i-love-gamee/us-central1/server/users/register", "POST", newUser);

        setUser(result);
    }

    const loginHandler = async (email, password) => {
        const result = await request("http://127.0.0.1:5001/i-love-gamee/us-central1/server/users/login", "POST", { email, password });

        setUser(result);
    }

    const logoutHandler = async () => {
        const accessToken = user?.accessToken;
        if (!accessToken) {
            setUser(null);
            return;
        }
        return request("http://127.0.0.1:5001/i-love-gamee/us-central1/server/users/logout", "GET", null, { accessToken })
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