import './MoviesCard.css';

// с апи длительность фильма будет приходить в минутах
function getTimeFromMins(mins) {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return hours + 'ч ' + minutes + 'м';
}

// всё, что касается likeActive - временное решение для верного отображения страницы


function MoviesCard(data) {
    const likeStatus = (`movie__like-button ${data.isLiked ? 'movie__like-button_active' : ''}`)
    return (
        <div className="movie">
            <img className="movie__poster" src={data.image} alt="постер к фильму" />
            <div className="movie__container">
                <p className="movie__name">{data.name}</p>
                    <button className={likeStatus}></button>
            </div>
            <p className="movie__duration">{getTimeFromMins(data.duration)}</p>
        </div >
    )
};

export default MoviesCard;