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

function App() {
    const [registeredUsers, setRegisterredUsers] = useState([]);
    const [user, setUser] = useState(null);

    const registerHandler = (email, password) => {
        if (registeredUsers.some(user => user.email === email)) {
            throw new Error("Email is taken!");
        }

        const newUser = { email, password };

        setRegisterredUsers((state) => [...state, newUser]);

        setUser(newUser);
    }

    const loginHandler = (email, password) => {
        const user = registeredUsers.find(u => u.email === email && u.password === password);    

        if (!user) {
            throw new Error("Invalid email or password!");
        }

        setUser(user);
    }

    return (
        <>
            <Header />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/games" element={<Catalog />} />
                <Route path="/games/:gameId/details" element={<Details />} />
                <Route path="/games/create" element={<Create />} />
                <Route path="/register" element={<Register onRegister={registerHandler} />} />
                <Route path="/login" element={<Login onLogin={loginHandler} />} />
            </Routes>

            <Footer />
        </>
    );
}

export default App
