import './App.css';
import { useEffect, useState } from 'react';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';
import * as MainApi from '../../utils/MainApi.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useMoviesApi } from '../../utils/MoviesApi.js';
import { LoadingStatus } from '../../utils/constants';
import { movieAdapter, savedMovieAdapter } from '../../utils/movieAdapter';

export function App() {

  const { getMovies, movieApiStatus, setMovieApiStatus } = useMoviesApi();

  const location = useLocation();
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [moviesForSearch, setMoviesForSearch] = useState([]);
  const [savedMoviesForSearch, setSavedMoviesForSearch] = useState([]);


  // Регистрация пользователя
  const onRegister = (name, email, password) => {
    MainApi.register(name, email, password)
      .then(() => {
        history.push('/signin')
      })
      .catch((err) => { console.log(err) });
  }

  // Авторизация пользователя
  const onLogin = (values) => {
    MainApi.login(values.email, values.password)
      .then(() => {
        setLoggedIn(true)
        history.push('/movies');
      })
      .catch((err) => { console.log(err.message) })
  }

  // Выход из аккаунта
  function onLogout() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
  }

  // редактирование данных пользователя
  const onEditProfile = (data) => {
    const jwt = localStorage.getItem('jwt')
    MainApi.editProfile(data, jwt)
      .then((res) => {
        setCurrentUser({
          name: res.name,
          email: res.email
        })
      })
      .catch((err) => { console.log(err) })
  }

  // проверка авторизиции и получение данных пользователя при монтировании
  const authCheck = (jwt) => {
    return MainApi.getUserData(jwt)
      .then((data) => {
        setLoggedIn(true);
        setCurrentUser(data);
      })
      .catch((err) => { console.log(err) })
  };

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      authCheck(jwt);
      location.pathname === '/signin' || location.pathname === '/signup' ? history.push('/movies') : history.push(location.pathname)
    }
  }, [loggedIn])

  const moviesWhithLikeData = JSON.parse(localStorage.getItem('moviesArr'))

  useEffect(() => {
    if (loggedIn) {
      const token = localStorage.getItem('jwt');
      if(moviesWhithLikeData) {
        setMovies(moviesWhithLikeData)
        setMoviesForSearch(moviesWhithLikeData)
        MainApi.getSavedMovies(token)
        .then(setMovieApiStatus(LoadingStatus.FETCHING))
        .then((savedMoviesRes) => {
          const adaptedSavedMovies = savedMoviesRes.slice().map(movie => savedMovieAdapter(movie))
          setSavedMovies(adaptedSavedMovies);
          setSavedMoviesForSearch(adaptedSavedMovies);
          setMovieApiStatus(LoadingStatus.SUCCESSFUL)
        })
      } else {
      Promise.all([getMovies(), MainApi.getSavedMovies(token)])
        .then(setMovieApiStatus(LoadingStatus.FETCHING))
        .then(([moviesRes, savedMoviesRes]) => {
          const adaptedMovies = moviesRes.slice().map(movie => movieAdapter(movie))
          const adaptedSavedMovies = savedMoviesRes.slice().map(movie => savedMovieAdapter(movie))
          setMoviesForSearch(adaptedMovies);
          setMovies(adaptedMovies);
          setSavedMovies(adaptedSavedMovies);
          setSavedMoviesForSearch(adaptedSavedMovies);
          setMovieApiStatus(LoadingStatus.SUCCESSFUL)
        })
        .catch((err) => {
          console.log(err)
          setMovieApiStatus(LoadingStatus.FAILURE)
        })
      }
    }
  }, [loggedIn])

  // поиск по фильмам
  const onSearchMovies = (value, searchedMovies) =>
    setMovies(searchedMovies.filter((movie) => movie.nameRU.toLowerCase().includes(value.toLowerCase())))

  const onSearchSavedMovies = (value, savedMoviesForSearch) =>
    setSavedMovies(savedMoviesForSearch.filter((movie) => movie.nameRU.toLowerCase().includes(value.toLowerCase())))

  // добавление фильма в избранное
  const onMovieLike = (movie) => {
    const jwt = localStorage.getItem('jwt');
    MainApi.addMovieToFavourites(movie, jwt)
      .then((newFavourite) => {
        setMovies((movies) => movies.map((movie) => {
          if (movie.id === newFavourite.movieId) {
            return savedMovieAdapter(newFavourite);
          }
          return movie;
        }));
        setMoviesForSearch((movies) => movies.map((movie) => {
          if (movie.id === newFavourite.movieId) {
            return savedMovieAdapter(newFavourite);
          }
          return movie;
        }));
        localStorage.setItem('moviesArr', JSON.stringify(movies))
        if (typeof newFavourite === 'object') {
          setSavedMovies([savedMovieAdapter(newFavourite), ...savedMovies]);
          setSavedMoviesForSearch([savedMovieAdapter(newFavourite), ...savedMovies]);
        }
      })
      .catch((err) => console.log(err))
  }

  const onMovieDelete = (movie) => {
    const jwt = localStorage.getItem('jwt');
    if (location.pathname === '/movies') {
      setMovies((movies) => movies.map((movie) => movieAdapter(movie)))
      setMoviesForSearch((movies) => movies.map((movie) => movieAdapter(movie)))
      MainApi.deleteMovieFromFavourites(movie._id, jwt)
        .then(() => {
          setSavedMovies(() => savedMovies.filter((deletedMovie) => deletedMovie._id !== movie._id))
          setSavedMoviesForSearch(() => savedMoviesForSearch.filter((deletedMovie) => deletedMovie._id !== movie._id))
        })
    } else if (location.pathname === '/saved-movies') {
      MainApi.deleteMovieFromFavourites(movie._id, jwt)
        .then(() => {
          setSavedMovies(() => savedMovies.filter((deletedMovie) => deletedMovie._id !== movie._id))
          setSavedMoviesForSearch(() => savedMoviesForSearch.filter((deletedMovie) => deletedMovie._id !== movie._id))
        })
        .catch((err) => console.log(err.message))
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route exact path="/">
            <Main
              loggedIn={loggedIn}
            />
          </Route>

          <ProtectedRoute path="/movies"
            loggedIn={loggedIn}
            component={Movies}
            moviesArr={movies}
            searchMoviesArr={moviesForSearch}
            onSearch={onSearchMovies}
            onMovieLike={onMovieLike}
            onMovieDelete={onMovieDelete}
            movieApiStatus={movieApiStatus}
          />
          <ProtectedRoute path="/saved-movies"
            component={SavedMovies}
            moviesArr={savedMovies}
            searchMoviesArr={savedMoviesForSearch}
            loggedIn={loggedIn}
            onMovieLike={onMovieLike}
            onMovieDelete={onMovieDelete}
            movieApiStatus={movieApiStatus}
            onSearch={onSearchSavedMovies}
          />
          <ProtectedRoute path="/profile"
            component={Profile}
            onEditProfile={onEditProfile}
            onSignout={onLogout}
            loggedIn={loggedIn}
          />

          <Route path="/signup">
            <Register
              onRegister={onRegister}
            />
          </Route>

          <Route path="/signin">
            <Login
              onLogin={onLogin}
            />
          </Route>

          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
