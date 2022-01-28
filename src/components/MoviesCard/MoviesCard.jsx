import './MoviesCard.css';
import { BASE_URL } from '../../utils/MoviesApi';
import { useLocation } from 'react-router-dom';

function getTimeFromMins(mins) {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return hours + 'ч ' + minutes + 'м';
}

function MoviesCard({ movie, onLike, onDelete }) {
    const location = useLocation();
    const { country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId, isLiked } = movie;

    const likeStatus = (`movie__like-button ${isLiked ? 'movie__like-button_active' : ''}`);
    const imageUrl = location.pathname === '/movies' && typeof movie === 'object' && movie?.image?.formats?.thumbnail?.url ? BASE_URL + movie.image.formats.thumbnail.url : movie.image;

    const handleLikeClick = () => {
        isLiked ? onDelete(movie) : onLike(movie)
    }
    return (
        <div className="movie">
            <img className="movie__poster" src={imageUrl} alt={director} />
            <div className="movie__container">
                <a href={movie.trailerLink} className="movie__name">{nameRU}</a >
                <button className={likeStatus} onClick={handleLikeClick}></button>
            </div>
            <p className="movie__duration">{getTimeFromMins(duration)}</p>
        </div >
    )
};

export default MoviesCard;