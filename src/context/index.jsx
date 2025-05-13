import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Map } from "immutable";
import { auth } from "../firebase";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState(Map());
    const [fGenre, setFGenre] = useState([]);
    const [purHis, setPurHis] = useState([]);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                console.log("Have a user");
            } else {
                setUser(null);
                console.log("Do not have a user");
            }
        });
    }, []);

    return (
        <StoreContext.Provider value={{ user, setUser, cart, setCart, fGenre, setFGenre, purHis, setPurHis }}>
            {children}
        </StoreContext.Provider>
    )
}

export const useStoreContext = () => {
    return useContext(StoreContext);
}