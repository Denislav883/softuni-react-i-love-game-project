import { useContext } from "react";
import UserContext from "../contexts/UserContext";

export default function useRequest() {
    const { user, isAuthenticated } = useContext(UserContext);

    const request = async (url, method, data) => {
        let options = {};

        if (method) {
            options.method = method;
        }

        if (data) {
            options.headers = {
                "content-type": "application/json"
            };

            options.body = JSON.stringify(data);
        }

        if(isAuthenticated) {
            options.headers = {
                ...options.headers,
                "X-Authorization": user.accessToken
            }
        }

        const response = await fetch(url, options);

        if (!response.ok) {
            throw response.statusText;
        }

        if(response.status === 204) {
            return {}; 
        }

        const result = await response.json();

        return (result);
    };

    return {
        request
    };
}