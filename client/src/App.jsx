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
    const [user, setUser] = useState(null);

    const authHandler = (email) => {
        setUser({
            email
        })
    }

    return (
        <>
            <Header />

        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<Catalog />} />
            <Route path="/games/:gameId/details" element={<Details />} />
            <Route path="/games/create" element={<Create />} />
            <Route path="/register" element={<Register onRegister={authHandler} />} />
            <Route path="/login" element={<Login onLogin={authHandler}/>} />
        </Routes>

            <Footer />
        </>
    );
}

export default App
