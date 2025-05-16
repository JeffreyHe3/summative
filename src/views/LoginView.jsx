import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useStoreContext } from "../context";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';
import "./LoginView.css";

function LoginView() {
    const navigate = useNavigate();
    const { setEmail } = useStoreContext();

    const handleSubmit = (e) => {
        e.preventDefault();
        setEmail(e.target[0].value);
        navigate("/movies/genres/28");
    };

    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            setUser(result.user);
            navigate("/movies/genres/28");
        } catch (error) {
            console.error("Google sign-in error:", error.message);
        }
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
                <button onClick={googleSignIn} className="google-signin-btn">Google Sign In</button>
            </div>
            <Footer />
        </div>
    )
}

export default LoginView;