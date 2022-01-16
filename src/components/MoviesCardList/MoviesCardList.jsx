import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router';
// import { useMoviesApi } from '../../utils/MoviesApi';
// import { LoadingStatus } from '../../utils/constants';

function MoviesCardList({ movies, onMovieLike, onMovieDelete }) {
    // const { movieApiStatus } = useMoviesApi();
    // return (
    //     <section className="movies-card-list">
    //         {movies.map((movie) => <MoviesCard key={movie.id} movie={movie} onDelete={onMovieDelete} onLike={onMovieLike} />)}
    //         {movies.length === 0 && 
    //                 <p className="movies-card-list__empty-block">Ничего нет</p>
    //         }
    //     </section>
    // )
    // case LoadingStatus.FETCHING:
    //     return(<></>)
    // case LoadingStatus.SUCCESSFUL:
    //     return (
    //         <section className="movies-card-list">
    //             {movies.map((movie) => <MoviesCard key={movie.id} movie={movie} onDelete={onMovieDelete} onLike={onMovieLike} />)}
    //             {movies.length === 0 &&
    //                 <p className="movies-card-list__empty-block">Ничего нет</p>
    //             }
    //         </section>
    //     )
    // case LoadingStatus.FAILURE:
    //     return (
    //         <section className="error-on-server">
    //             <h2>На сервере произошла ошибка</h2>
    //         </section>
    //     )
    // default: break;
    // while (movieApiStatus === LoadingStatus.INNITIAL || LoadingStatus.FETCHING) {
    //     return (<></>)
    // }
    const location = useLocation();
    return (
        <section className="movies-card-list">

            {movies.map((movie) => {
                return (
            <MoviesCard
                key={location.pathname === '/movies' ? movie.id : movie._id}
                movie={movie}
                onLike={onMovieLike}
                onDelete={onMovieDelete}
            />)})}
            {movies.length === 0 &&
                <p className="movies-card-list__empty-block">Ничего нет</p>
            }
        </section>
    )

}

export default MoviesCardList;