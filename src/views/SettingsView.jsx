import "./SettingsView.css";
import { useStoreContext } from "../Context";
import { useNavigate } from "react-router-dom"

function SettingsView() {
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

    const { setFGenre, fGenre } = useStoreContext();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // setFName(e.target[0].value);
        // setLName(e.target[1].value);
        const checkedGenres = [];
        const checkboxes = e.target.querySelectorAll('input[type="checkbox"]');

        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                checkedGenres.push(Number(checkbox.id));
            }
        });

        setFGenre(checkedGenres);
    };

    return (
        <div id="settingsPage">
            <button className="button" onClick={() => navigate(-1)}>Back</button>
            <form onSubmit={handleSubmit}>
                <h1>Settings</h1>
                <h1>First Name:</h1>
                {/* <input id="inputFName" className="input" type="text" defaultValue={fName}></input> */}
                <h1>Last Name:</h1>
                {/* <input id="inputLName" className="input" type="text" defaultValue={lName}></input> */}
                {/* <h1>{`Email: ${email}`}</h1> */}
                <h1>Favourite Genres:</h1>
                {genreList && genreList.map(genre => (
                    <div key={genre.id}>
                        <input id={genre.id} type="checkbox" defaultChecked={fGenre.includes(genre.id)}></input>
                        <label className="genreLabels" htmlFor={genre.id}>{genre.genre}</label>
                    </div>
                ))}
                <input className="button" type="submit" value="Save Account Details" />
            </form>
        </div>

    )
}

export default SettingsView;