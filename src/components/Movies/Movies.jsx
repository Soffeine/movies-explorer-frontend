import { useRef, useState } from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { useScreenWidth } from '../hooks/useScreenWidth';

function Movies({ loggedIn, moviesArr, onSearch, searchMoviesArr }) {
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
                <MoviesCardList movies={currentMoviesArr} />
            </section>
            <Footer />
        </div>
    )
}

export default Movies;