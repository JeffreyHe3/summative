import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from "react-router-dom";
import { useStoreContext } from '../Context';
import "./LoginView.css";

function LoginView() {
    const [form, setForm] = useState({ email: '', password: '' });
    const { setUser } = useStoreContext();
    const navigate = useNavigate();

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await signInWithEmailAndPassword(auth, form.email, form.password);
            setUser(result.user);
            console.log("User signed in:");
        } catch (error) {
            console.error("Login error:", error.message);
        }
    };

    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            setUser(result.user);
            console.log("User signed in with Google:");
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
                    <input id="email" type="email" className="input" name="email" onChange={handleChange} placeholder="Email" autoComplete="on" required />
                    <input id="password" type="password" className="input" name="password" onChange={handleChange} placeholder="Password" required />
                    <input id="loginButton" type="submit" value="Login" />
                </form>
                <button onClick={googleSignIn} className="google-signin-btn">
                    <img className="googleIcon" src="google-logo.png"></img>
                    Log in with Google
                </button>
            </div>
            <Footer />
        </div>
    )
}

export default LoginView;