import { useStoreContext } from "../Context";
import { useNavigate } from "react-router-dom"
import "./CartView.css";

function CartView() {
    const { cart, setCart, fGenre } = useStoreContext();
    const navigate = useNavigate();

    const checkout = () => {
        setCart([]);
    };

    return (
        <div id="cartBody">
            <button className="button" onClick={() => navigate(`/movies/genres/${fGenre[0]}`)}>Back</button>
            <h1 id="cTitle">Cart</h1>
            <div className="cartContainer">
                {cart.entrySeq().map(([key, value]) => {
                    return (
                        <div className="cartItem" key={key}>
                            {value.poster_path && <img src={`https://image.tmdb.org/t/p/w500${value.poster_path}`} alt={value.title} />}
                            <h3>{value.title}</h3>
                            <button className="removeButton" onClick={() => setCart((prevCart) => prevCart.delete(value.id))}>Remove</button>
                        </div>
                    )
                })}
            </div>
            <button onClick={() => checkout()}>Checkout</button>
        </div>

    );
}

export default CartView;