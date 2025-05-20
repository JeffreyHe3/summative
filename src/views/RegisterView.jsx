import Header from "../components/Header";
import Footer from "../components/Footer";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from "react-router-dom";
import { useStoreContext } from "../Context";
import "./RegisterView.css";

function RegisterView() {
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

    const { setFGenre } = useStoreContext();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const password1 = e.target[3].value;
        const password2 = e.target[4].value;
        const checkedGenres = [];
        const checkboxes = e.target.querySelectorAll('input[type="checkbox"]');
    
        if (password1 !== password2) {
            alert("Passwords do not match.");
            return;
        }
    
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                checkedGenres.push(Number(checkbox.id));
            }
        });
    
        if (checkedGenres.length < 5) {
            alert("Please select at least 5 favorite genres.");
            return;
        }

        // setFGenre(checkedGenres);

        try {
            const result = await createUserWithEmailAndPassword(auth, e.target[2].value, e.target[3].value);
            setUser(result.user);
            navigate(`/movies/genres/${checkedGenres[0]}`);
        } catch (error) {
            console.error("Error creating user:", error);
        }
    };

    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            setUser(result.user);
            console.log("User signed in with Google:", result.user);
        } catch (error) {
            console.error("Error signing in with Google:", error);
        }
    }

    return (
        <div>
            <Header />
            <div id="rForm" >
                <h1 id="rTitle">Register</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="firstName" className="inputLabel">First Name</label>
                    <input id="firstName" type="text" className="input" name="firstName" required />
                    <label htmlFor="lastName" className="inputLabel">Last Name</label>
                    <input id="lastName" type="text" className="input" name="lastName" required />
                    <label htmlFor="email" className="inputLabel">Email</label>
                    <input id="email" type="email" className="input" name="email" autoComplete="on" required />
                    <label htmlFor="1Password" className="inputLabel">Password</label>
                    <input id="1Password" type="password" className="input" name="1Password" required />
                    <label htmlFor="2Password" className="inputLabel">Re-enter Password</label>
                    <input id="2Password" type="password" className="input" name="2Password" required />
                    <p id="genreListTitle">Choose at least 5 of your favourite genres</p>
                    {genreList && genreList.map(genre => (
                        <div key={genre.id}>
                            <input id={genre.id} type="checkbox"></input>
                            <label htmlFor={genre.id} className="inputLabel">{genre.genre}</label>
                        </div>
                    ))}
                    <input id="submitButton" type="submit" value="Register" />
                </form>
                <button onClick={googleSignIn} className="google-signin-btn">Google Sign In</button>
            </div>
            <Footer />
        </div>
    )
}

export default RegisterView;