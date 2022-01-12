import './MoviesCard.css';
import { BASE_URL } from '../../utils/MoviesApi';
// с апи длительность фильма будет приходить в минутах
function getTimeFromMins(mins) {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return hours + 'ч ' + minutes + 'м';
}

// всё, что касается likeActive - временное решение для верного отображения страницы


function MoviesCard({ movie }) {
    const {isLiked, image, director, nameRU, trailerLink, duration } = movie;
    const likeStatus = (`movie__like-button ${isLiked ? 'movie__like-button_active' : ''}`)
    return (
        <div className="movie">
            <img className="movie__poster" src={BASE_URL + image.formats.thumbnail.url} alt={director} />
            <div className="movie__container">
                <a href={trailerLink} className="movie__name">{nameRU}</a >
                    <button className={likeStatus}></button>
            </div>
            <p className="movie__duration">{getTimeFromMins(duration)}</p>
        </div >
    )
};

export default MoviesCard;