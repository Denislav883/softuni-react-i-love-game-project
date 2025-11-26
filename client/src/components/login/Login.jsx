import { useNavigate } from "react-router";

export default function Login({
    onLogin
}) {
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const email = formData.get("email");
        const password = formData.get("password");

        if(!email || !password) {
            return alert("Email and password are required!");
        }

        try {
            onLogin(email, password);

            navigate("/");
        } catch(err) {
            alert(err.message);
        }
    }

    return (
        <section id="login-page">

            <form id="login" onSubmit={submitHandler}>
                <div className="container">
                    <h1>Login</h1>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="Your Email" />

                    <label htmlFor="login-pass">Password</label>
                    <input type="password" id="login-password" name="password" placeholder="Password" />
                    <input type="submit" className="btn submit" value="Login" />
                </div>
            </form>
        </section>
    );
}