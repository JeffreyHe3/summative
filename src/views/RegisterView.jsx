import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import { useStoreContext } from '../Context';
import { useNavigate } from 'react-router-dom'; import "./RegisterView.css";

function RegisterView() {
    const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', password2: '' });
    const { setUser, fGenre } = useStoreContext();
    const [displayName, setDisplayName] = useState("");
    const navigate = useNavigate();
    const genreList = [
        {
            "genre": "Action", "id": 28
        },
        {
            "genre": "Adventure", "id": 12
        },
        {
            "genre": "Animation", "id": 16
        },
        {
            "genre": "Crime", "id": 80
        },
        {
            "genre": "Family", "id": 10751
        },
        {
            "genre": "Fantasy", "id": 14
        },
        {
            "genre": "History", "id": 36
        },
        {
            "genre": "Horror", "id": 27
        },
        {
            "genre": "Mystery", "id": 9648
        },
        {
            "genre": "Sci-Fi", "id": 878
        },
        {
            "genre": "War", "id": 10752
        },
        {
            "genre": "Western", "id": 37
        }
    ]

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleChecked = e => {
        if (e.target.checked) {
            fGenre.indexOf(e.target.checked);
            fGenre.splice(e.target.checked, 1);
        } else {
            fGenre.push(e.target.id);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.password2) {
            alert("Passwords do not match.");
            return;
        }

        if (fGenre.length < 5) {
            alert("Please select at least 5 favorite genres.");
            return;
        }

        setDisplayName(form.firstName + " " + form.lastName);
        updateProfile(auth.currentUser, {
            displayName: displayName
        })

        try {
            const result = await createUserWithEmailAndPassword(auth, form.email, form.password);
            setUser(result.user);
            navigate(`/movies/genres/${fGenre[0]}`);
        } catch (error) {
            console.error("Error creating user:", error);
        }
    }

    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            setUser(result.user);
            console.log("User signed in with Google:", result.user);
            navigate(`/movies/genres/${fGenre[0]}`);
        } catch (error) {
            console.error("Error signing in with Google:", error);
        }
    }

    return (
        <>
            <Header />
            <div id="rForm" >
                <h1 id="rTitle">Register</h1>
                <form onSubmit={handleSubmit}>
                    <input id="firstName" type="text" className="input" name="firstName" onChange={handleChange} placeholder="First Name" required />
                    <input id="lastName" type="text" className="input" name="lastName" onChange={handleChange} placeholder="Last Name" required />
                    <input id="email" type="email" className="input" name="email" autoComplete="on" onChange={handleChange} placeholder="Email" required />
                    <input id="password" type="password" className="input" name="password" onChange={handleChange} placeholder="Password" required />
                    <input id="password2" type="password" className="input" name="password2" onChange={handleChange} placeholder="Re-enter Password" required />
                    <p id="genreListTitle">Choose at least 5 of your favourite genres</p>
                    {genreList && genreList.map(genre => (
                        <div key={genre.id}>
                            <input id={genre.id} type="checkbox" onChange={handleChecked}></input>
                            <label htmlFor={genre.id} className="inputLabel"> {genre.genre}</label>
                        </div>
                    ))}
                    <input id="submitButton" type="submit" value="Register" />
                </form>
                <button onClick={googleSignIn} className="googleSigninBtn">
                    <img className="googleIcon" src="google-logo.png"></img>
                    Log in with Google
                </button>
            </div>
            <Footer />
        </>
    )
}

export default RegisterView;