import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useStoreContext } from "../Context";
import "./RegisterView.css";

function RegisterView() {
    const { setEmail, setLogged, setFName, setLName, genreList, setFGenre } = useStoreContext();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const fName = e.target[0].value;
        const lName = e.target[1].value;
        const email = e.target[2].value;
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
    
        setFName(fName);
        setLName(lName);
        setEmail(email);
        setLogged(true);
        setFGenre(checkedGenres);

        navigate(`/movies/genres/${checkedGenres[0]}`);
    };
    

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
            </div>
            <Footer />
        </div>
    )
}

export default RegisterView;