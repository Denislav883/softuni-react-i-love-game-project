import { Route, Routes } from "react-router";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Catalog from "./components/catalog/Catalog";
import Details from "./components/details/Details";
import Create from "./components/create/Create";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Logout from "./components/logout/Logout";
import Edit from "./components/edit/Edit";
import UserContext from "./contexts/UserContext";
import { useContext } from "react";

function App() {
    const { user } = useContext(UserContext);

    return (
        <>
            <Header user={user} />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/games" element={<Catalog />} />
                <Route path="/games/:gameId/details" element={<Details user={user} />} />
                <Route path="/games/:gameId/edit" element={<Edit />} />
                <Route path="/games/create" element={<Create />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
            </Routes>

            <Footer />
        </>
    );
}

export default App
