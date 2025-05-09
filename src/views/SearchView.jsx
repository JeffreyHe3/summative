import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useStoreContext } from "../Context";
import "./SearchView.css";

function SearchView() {
    const [loading, setLoading] = useState(false);
    const [movies, setMovies] = useState([]);
    let page = useRef(1);
    let pages = useRef(0);
    const { cart, setCart, search } = useStoreContext();
    const navigate = useNavigate();

    useEffect(() => {
        async function getData() {
            const res = ((await axios.get(`https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1&api_key=${import.meta.env.VITE_TMDB_KEY}`)).data);
            setMovies(res.results);
            pages.current = res.total_pages;

        }
        getData();
    }, [search]);

    const getMoreData = async (direction) => {
        const nextPage = page.current + direction;
        if (nextPage > 0 && nextPage <= pages.current) {
            setLoading(true);
            page.current = nextPage;
            try {
                setMovies((await axios.get(`https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=${nextPage}&api_key=${import.meta.env.VITE_TMDB_KEY}`)).data.results);
            } catch (error) {
                console.log("Error fetching API");
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div>
            <div className="movie-container">
                {movies && movies.map(movie => (
                    <div key={movie.id} >
                        <div className="movie-card" onClick={() => navigate(`/movies/details/${movie.id}`)}>
                            <h1>{`${movie.title}`}</h1>
                            {movie.poster_path && <img className="movie-poster" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`${movie.id}`} />}
                        </div>
                        <button className="buyButtons" onClick={() => setCart((prevCart) => prevCart.set(movie.id, movie))}>{cart.has(movie.id) ? "Added" : "Buy"}</button>
                    </div>
                ))}
            </div>
            <div className="pagination">
                <button onClick={() => getMoreData(-1)} disabled={loading || page.current === 1}>Prev</button>
                <p>{`Page ${page.current} of ${pages.current}`}</p>
                <button onClick={() => getMoreData(1)} disabled={loading || page.current === pages.current}>Next</button>
            </div>
            {loading && <p>Loading...</p>}
        </div >
    )
}

export default SearchView;