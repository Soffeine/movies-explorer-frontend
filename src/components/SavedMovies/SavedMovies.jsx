import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { savedMoviesArr } from '../../utils/constants';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function SavedMovies({loggedIn}) {
    return (
        <>
        <Header loggedIn={loggedIn}/>
        <section className="saved-movies">
            <SearchForm />
            <MoviesCardList movies={savedMoviesArr} />
        </section>
        <Footer />
        </>
    )
}

export default SavedMovies;