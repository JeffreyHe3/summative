import { createContext, useContext, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Map } from "immutable";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [logged, setLogged] = useState(false);
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [search, setSearch] = useState("");
    const [cart, setCart] = useState(Map());
    const [fGenre, setFGenre] = useState([]);

    return (
        <StoreContext.Provider value={{ user, setUser, fName, setFName, lName, setLName, email, setEmail, cart, setCart, logged, setLogged, search, setSearch, fGenre, setFGenre }}>
            {children}
        </StoreContext.Provider>
    )
}

export const useStoreContext = () => {
    return useContext(StoreContext);
}