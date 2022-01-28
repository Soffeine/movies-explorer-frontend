import { useRef, useState } from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useFilmShowing } from '../hooks/useFilmShowing';
import MoreButton from '../MoreButton/MoreButton';
import Preloader from '../Preloader/Preloader';
import { LoadingStatus } from '../../utils/constants';

function SavedMovies({ loggedIn, moviesArr, onSearch, searchMoviesArr, onMovieLike, onMovieDelete, movieApiStatus }) {
    const [isShortFilm, setIsShortFilm] = useState(false)
    const rootRef = useRef();
    const { currentMoviesArr, onShowMoreClick, maxFilmCounter, maxFilmsNumber } = useFilmShowing({ containerRef: rootRef, arr: moviesArr, isShortFilm })
    return (
        <div ref={rootRef}>
            <Header loggedIn={loggedIn} />
            <section className="saved-movies">
                <SearchForm handleCheckbox={setIsShortFilm}
                    onSearch={onSearch}
                    movieArr={moviesArr}
                    searchMoviesArr={searchMoviesArr}
                />
                            {
                    movieApiStatus === LoadingStatus.FETCHING &&
                    (
                        <Preloader />
                    )
                }
                {
                    movieApiStatus === LoadingStatus.SUCCESSFUL &&
                    (
                            <MoviesCardList movies={currentMoviesArr}
                                onMovieLike={onMovieLike}
                                onMovieDelete={onMovieDelete}
                            />
                    )
                }
                {
                    movieApiStatus === LoadingStatus.SUCCESSFUL &&
                    maxFilmCounter < maxFilmsNumber &&
                    (
                        <MoreButton onShowMoreClick={onShowMoreClick} />
                    )

                }
            </section>
            <Footer />
        </div>
    )
}

export default SavedMovies;