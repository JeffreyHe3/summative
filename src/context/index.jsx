import { createContext, useContext, useState } from "react";
import { Map } from "immutable";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [logged, setLogged] = useState(false);
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [search, setSearch] = useState("");
    const [cart, setCart] = useState(Map());
    const [fGenre, setFGenre] = useState([]);
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

    return (
        <StoreContext.Provider value={{ fName, setFName, lName, setLName, email, setEmail, cart, setCart, logged, setLogged, search, setSearch, fGenre, setFGenre, genreList }}>
            {children}
        </StoreContext.Provider>
    )
}

export const useStoreContext = () => {
    return useContext(StoreContext);
}