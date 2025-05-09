import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./DetailView.css";

function DetailView() {
    const param = useParams();
    const [movies, setMovies] = useState([]);
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        async function getData() {
            setMovies((await axios.get(`https://api.themoviedb.org/3/movie/${param.id}?api_key=${import.meta.env.VITE_TMDB_KEY}`)).data);
            setVideos((await axios.get(`https://api.themoviedb.org/3/movie/${param.id}/videos?language=en-US&api_key=${import.meta.env.VITE_TMDB_KEY}`)).data.results);
        };

        getData();
    }, [param.id]);

    return (
        <div>
            <h2>Title: {movies.title}</h2>
            <h3>Tagline: {movies.tagline}</h3>
            {movies.poster_path && <img key={movies.id} src={`https://image.tmdb.org/t/p/w500${movies.poster_path}`} alt={movies.title}></img>}
            <h2>Trailers</h2>
            {movies && videos.filter(video => video.type.toLowerCase() === "trailer").map(video => (
                <iframe key={video.key} width="420" height="315" src={`https://www.youtube.com/embed/${video.key}`} title={video.name} allowFullScreen />
            ))}
            <h2>Overview:</h2>
            <h2>{movies.overview}</h2>
            <h2>Release Date: {movies.release_date}</h2>
            <h2>Runtime: {movies.runtime} minutes</h2>
            <h2>Original Language: {movies.original_language}</h2>
            <h2>Spoken Languages:</h2>
            {movies.spoken_languages && movies.spoken_languages.map((movie) => (
                <li key={movie.name}>{movie.name}</li>
            ))}
            <h2>Genres:</h2>
            {movies.genres && movies.genres.map((movie) => (
                <li key={movie.name}>{movie.name}</li>
            ))}
            <h2>Production Companies: </h2>
            {movies.production_countries && movies.production_companies.map((movie) => (
                <li key={movie.name}>{movie.name}</li>
            ))}
            <h2>Production Countries: </h2>
            {movies.production_countries && movies.production_countries.map((movie) => (
                <li key={movie.name}>{movie.name}</li>
            ))}
        </div>
    )
}

export default DetailView;