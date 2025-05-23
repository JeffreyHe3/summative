import { useState } from "react";
import { useStoreContext } from "../Context";
import "./SettingsView.css";

function SettingsView() {
    const { user, setUser, fGenre, setFGenre } = useStoreContext();
    const [saved, setSaved] = useState(false);
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

    const handleSubmit = (e) => {
        e.preventDefault();

        const checkedGenres = [];
        const checkboxes = e.target.querySelectorAll('input[type="checkbox"]');

        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                checkedGenres.push(Number(checkbox.id));
            }
        });
        
        setFGenre(checkedGenres);

        setSaved(true);
    };

    return (
        <div id="settingsPage">
            <button className="button" onClick={() => navigate(-1)}>Back</button>
            <form id="settingForms" onSubmit={handleSubmit}>
                <h1>Settings</h1>
                <h1>First Name:</h1>
                <input id="inputFName" className="settingsInput" type="text" defaultValue={``}></input>
                <h1>Last Name:</h1>
                <input id="inputLName" className="settingsInput" type="text" defaultValue={``}></input>
                <h1>{`Email: ${user.email}`}</h1>
                <h1>Favourite Genres:</h1>
                {genreList && genreList.map(genre => (
                    <div key={genre.id}>
                        <input id={genre.id} type="checkbox" defaultChecked={fGenre.includes(genre.id)}></input>
                        <label className="genreLabels" htmlFor={genre.id}>{genre.genre}</label>
                    </div>
                ))}
                <input className="button" type="submit" value="Save Account Details" />
                {saved && <p display="none" id="savedText">Saved!</p>}
            </form>
        </div>

    )
}

export default SettingsView;