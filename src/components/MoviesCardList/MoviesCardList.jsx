import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import MoreButton from '../MoreButton/MoreButton';

function MoviesCardList({ movies }) {
    return (
        <section className="movies-card-list">
            {movies.map((movie) => <MoviesCard key={movie.id} movie={movie} />)}
            {movies.length === 0 && 
                    <p className="movies-card-list__empty-block">Ничего нет</p>
            }
            <MoreButton />
        </section>
    )
}

export default MoviesCardList;