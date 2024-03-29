import { useRef, useState, useEffect } from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useFilmShowing } from '../hooks/useFilmShowing';
import MoreButton from '../MoreButton/MoreButton';
import Preloader from '../Preloader/Preloader';
import { LoadingStatus } from '../../utils/constants';

function SavedMovies({ loggedIn, moviesArr, onSearch, searchMoviesArr, onMovieLike, onMovieDelete, movieApiStatus, checkboxStatus }) {

    const [isShortFilm, setIsShortFilm] = useState(checkboxStatus)
    const rootRef = useRef();
    const { currentMoviesArr, onShowMoreClick, maxFilmCounter, maxFilmsNumber } = useFilmShowing({ containerRef: rootRef, arr: moviesArr, isShortFilm })

    const handleCheckbox = () => {
        localStorage.setItem('checkboxStatus', !isShortFilm);
        setIsShortFilm(!isShortFilm);
    }

    useEffect(() => {
        if (checkboxStatus !== undefined) {
            setIsShortFilm(checkboxStatus)
        }
    }, [checkboxStatus]);

    return (
        <div ref={rootRef}>
            <Header loggedIn={loggedIn} />
            <section className="saved-movies">
                <SearchForm handleCheckbox={handleCheckbox}
                    onSearch={onSearch}
                    movieArr={moviesArr}
                    searchMoviesArr={searchMoviesArr}
                    checkboxStatus={checkboxStatus}
                />
                {
                    movieApiStatus === LoadingStatus.FETCHING &&
                    (
                        <Preloader />
                    )
                }
                {
                    currentMoviesArr.length < 1 &&
                    <p className="empty-list">В избранном пока нет фильмов</p>
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