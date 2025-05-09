import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useStoreContext } from "../Context";
import "./LoginView.css";

function LoginView() {
    const navigate = useNavigate();
    const { setLogged } = useStoreContext();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/movies/genres/28");
        setLogged(true);
    };

    return (
        <div>
            <Header />
            <div id="lForm">
                <h1 id="lTitle">Login</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email" className="inputLabel">Email</label>
                    <input id="email" type="email" className="input" name="email" autoComplete="on" required />
                    <label htmlFor="password" className="inputLabel">Password</label>
                    <input id="password" type="password" className="input" name="password" required />
                    <input id="loginButton" type="submit" value="Login" />
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default LoginView;