import { useRef } from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import { moviesArr } from '../../utils/constants';
import Footer from '../Footer/Footer';
import { useScreenWidth } from '../hooks/useScreenWidth';

function Movies({loggedIn}) {
    const rootRef = useRef();
    const { currentMoviesArr } = useScreenWidth({ containerRef: rootRef, arr: moviesArr })

    return (
        <div ref={rootRef}>
            <Header loggedIn={loggedIn} />
            <section className="movies">
                <SearchForm />
                <MoviesCardList movies={currentMoviesArr} />
                <Preloader />
            </section>
            <Footer />
        </div>
    )
}

export default Movies;