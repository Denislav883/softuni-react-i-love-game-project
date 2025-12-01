import { Route, Routes } from "react-router";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Catalog from "./components/catalog/Catalog";
import Details from "./components/details/Details";
import Create from "./components/create/Create";
import Register from "./components/register/Register";
import { useState } from "react";
import Login from "./components/login/Login";
import Logout from "./components/logout/Logout";
import Edit from "./components/edit/Edit";
import request from "./utils/request";
import UserContext from "./contexts/UserContext";

function App() {
    const [user, setUser] = useState(null);

    const registerHandler = async (email, password) => {
        const newUser = { email, password };

        const result = await request("http://localhost:3030/users/register", "POST", newUser);

        setUser(result);
    }

    const loginHandler = (email, password) => {

        if (!user) {
            throw new Error("Invalid email or password!");
        }

        setUser(user);
    }

    const logoutHandler = () => {
        setUser(null);
    }

    const userContextValues = {
        user,
        isAuthenticated: !!user?.accessToken,
        registerHandler,
        loginHandler,
        logoutHandler
    }

    return (
        <>
        <UserContext.Provider value={userContextValues}>
            <Header />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/games" element={<Catalog />} />
                <Route path="/games/:gameId/details" element={<Details user={user} />} />
                <Route path="/games/:gameId/edit" element={<Edit />} />
                <Route path="/games/create" element={<Create />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login onLogin={loginHandler} />} />
                <Route path="/logout" element={<Logout onLogout={logoutHandler} />} />
            </Routes>

            <Footer />
            </UserContext.Provider>
        </>
    );
}

export default App
