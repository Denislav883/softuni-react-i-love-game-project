import { Link } from "react-router";

export default function Header() {
    return (
        <header>
            {/* <!-- Navigation --> */}
            <nav>
                <Link className="home" to="/"> <img src="./images/logo.png" alt="logo" /> </Link>
                <Link to="/games">Catalog</Link>
                {/* <!-- Logged-in users --> */}
                <div id="user">
                    <Link to="/games/create">Add Game</Link>
                    <a href="#">Logout</a>
                </div>
                {/* <!-- Guest users --> */}
                <div id="guest">
                    <a href="#">Login</a>
                    <a href="#">Register</a>
                </div>
            </nav>
        </header>
    )
}