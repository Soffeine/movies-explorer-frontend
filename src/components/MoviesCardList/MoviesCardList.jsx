import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router';
// import { useMoviesApi } from '../../utils/MoviesApi';
// import { LoadingStatus } from '../../utils/constants';

function MoviesCardList({ movies, onMovieLike, onMovieDelete }) {
    const location = useLocation();
    return (
        <section className="movies-card-list">

            {movies.map((movie) => {
                return (
            <MoviesCard
                key={location.pathname === '/saved-movies' ? movie._id : movie.id}
                movie={movie}
                onLike={onMovieLike}
                onDelete={onMovieDelete}
            />)})}
            {/* {movies.length === 0 &&
                <p className="movies-card-list__empty-block">Ничего нет</p>
            } */}
        </section>
    )

}

export default MoviesCardList;