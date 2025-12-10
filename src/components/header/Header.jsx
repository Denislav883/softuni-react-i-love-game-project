import { useContext } from "react";
import { Link } from "react-router";
import UserContext from "../../contexts/UserContext";

export default function Header() {
    const { isAuthenticated } = useContext(UserContext);

    return (
        <header>
            {/* <!-- Navigation --> */}
            <nav>
                <Link className="home" to="/"> <img src="./images/logo.png" alt="logo" /> </Link>
                <Link to="/games">Catalog</Link>
                {isAuthenticated
                    ? (
                        // Logged-in users
                        <div id="user">
                            <Link to="/games/create">Add Game</Link>
                            <Link to="/logout">Logout</Link>
                        </div>
                    )
                    : (
                        // Guest users
                        <div id="guest">
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </div>
                    )
                }
            </nav>
        </header>
    )
}