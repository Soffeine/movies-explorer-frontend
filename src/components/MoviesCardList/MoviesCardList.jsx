import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';


function MoviesCardList({ movies }) {
    return (
        <section className="movies-card-list">
            {movies.map((movie) => {
                return (<MoviesCard key={movie.id}
                    name={movie.name}
                    image={movie.image}
                    duration={movie.duration}
                    isLiked={movie.isLiked}
                />)
            })}
        </section>
    )
}

export default MoviesCardList;