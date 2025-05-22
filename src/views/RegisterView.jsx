import Header from "../components/Header";
import Footer from "../components/Footer";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from "react-router-dom";
import { useStoreContext } from "../Context";
import "./RegisterView.css";

function RegisterView() {

    return (
        <div>
        </div>
    )
}

export default RegisterView;