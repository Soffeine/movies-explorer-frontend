import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router';

function MoviesCardList({ movies, onMovieLike, onMovieDelete }) {
    const location = useLocation();
    return (
        <section className="movies-card-list">

            {movies.map((movie) => {
                return (
            <MoviesCard
                key={location.pathname === '/saved-movies' ? movie.movieId : movie.id}
                movie={movie}
                onLike={onMovieLike}
                onDelete={onMovieDelete}
            />)})}
        </section>
    )

}

export default MoviesCardList;