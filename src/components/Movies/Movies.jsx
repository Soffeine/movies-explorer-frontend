import { useRef, useState } from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { useScreenWidth } from '../hooks/useScreenWidth';
import MoreButton from '../MoreButton/MoreButton';

function Movies({ loggedIn, moviesArr, onSearch, searchMoviesArr, onShowMoreClick, onMovieLike, onMovieDelete }) {
    const [isShortFilm, setIsShortFilm] = useState(false)
    const rootRef = useRef();
    const { currentMoviesArr } = useScreenWidth({ containerRef: rootRef, arr: moviesArr, isShortFilm })

    return (
        <div ref={rootRef}>
            <Header loggedIn={loggedIn} />
            <section className="movies">
                <SearchForm handleCheckbox={setIsShortFilm}
                    onSearch={onSearch}
                    movieArr={moviesArr}
                    searchMoviesArr={searchMoviesArr}
                />
                <MoviesCardList movies={currentMoviesArr}
                    onMovieLike={onMovieLike}
                    onMovieDelete={onMovieDelete}
                />
                <MoreButton onShowMoreClick={onShowMoreClick} />
            </section>
            <Footer />
        </div>
    )
}

export default Movies;