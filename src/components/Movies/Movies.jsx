import { useRef, useState, useEffect } from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { useFilmShowing } from '../hooks/useFilmShowing';
import MoreButton from '../MoreButton/MoreButton';
import Preloader from '../Preloader/Preloader';
import { LoadingStatus } from '../../utils/constants';

function Movies({ loggedIn, moviesArr, onSearch, searchMoviesArr, onMovieLike, onMovieDelete, movieApiStatus, checkboxStatus }) {
    
    const [isShortFilm, setIsShortFilm] = useState(checkboxStatus)
    const rootRef = useRef();
    const { currentMoviesArr, onShowMoreClick, maxFilmCounter, maxFilmsNumber } = useFilmShowing({ containerRef: rootRef, arr: moviesArr, isShortFilm, })

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
            <section className="movies">
                <SearchForm handleCheckbox={handleCheckbox}
                    onSearch={onSearch}
                    movieArr={moviesArr}
                    searchMoviesArr={searchMoviesArr}
                    checkboxStatus={isShortFilm}
                />

                {
                    movieApiStatus === LoadingStatus.FETCHING &&
                    (
                        <Preloader />
                    )
                }
                {
                    currentMoviesArr.length < 1 && movieApiStatus === LoadingStatus.SUCCESSFUL &&
                    <p className="empty-list">Ничего не найдено</p>
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

export default Movies;