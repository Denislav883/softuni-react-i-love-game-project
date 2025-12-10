import { useNavigate } from "react-router";
import useForm from "../../hooks/useForm";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";

export default function Login() {
    const navigate = useNavigate();
    const { loginHandler } = useContext(UserContext);

    const submitHandler = async ({ email, password }) => {
        if(!email || !password) {
            return alert("Email and password are required!");
        }

        try {
            await loginHandler(email, password);

            navigate("/");
        } catch(err) {
            alert(err.message);
        }
    }

    const { register, formAction } = useForm(submitHandler, {
        email: "",
        password: ""
    });

    return (
        <section id="login-page">

            <form id="login" action={formAction}>
                <div className="container">
                    <h1>Login</h1>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" {...register("email")} placeholder="Your Email" />

                    <label htmlFor="login-pass">Password</label>
                    <input type="password" id="login-password" {...register("password")} placeholder="Password" />
                    <input type="submit" className="btn submit" value="Login" />
                </div>
            </form>
        </section>
    );
}