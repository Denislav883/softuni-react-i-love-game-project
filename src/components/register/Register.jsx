import { useNavigate } from "react-router";
import useForm from "../../hooks/useForm";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";

export default function Register() {
    const navigate = useNavigate();
    const { registerHandler } = useContext(UserContext);

    const registerSubmitHandler = async (values) => {
        const { email, password, confirmPassword } = values;

        if(!email || !password) {
            return alert("Email and password are required!");
        }

        if(password !== confirmPassword) {
            return alert("Password missmatch!")
        }

        try {
           await registerHandler(email, password);
    
            navigate("/");
        } catch(err) {
            alert(err.message);
        }
    }

    const { register, formAction } = useForm(registerSubmitHandler, {
        email: "",
        password: "",
        confirmPassword: ""
    });

    return (
        <section id="register-page" className="content auth">
            <form id="register" action={formAction}>
                <div className="container">
                    <div className="brand-logo"></div>
                    <h1>Register</h1>

                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" {...register("email")} placeholder="Your Email" />

                    <label htmlFor="pass">Password:</label>
                    <input type="password" id="register-password" {...register("password")} placeholder="Password" />

                    <label htmlFor="con-pass">Confirm Password:</label>
                    <input type="password" id="confirm-password" {...register("confirmPassword")} placeholder="Repeat Password" />

                    <input className="btn submit" type="submit" value="Register" />
                </div>
            </form>
        </section>
    );
}