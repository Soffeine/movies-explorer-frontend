// лайки
// сохранение состояния чекбокса и результата поиска
import React from 'react';
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
import useForm from '../hooks/useForm';

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

  const { errors, setSubmitError } = useForm();


  // Регистрация пользователя
  const onRegister = (name, email, password) => {
    MainApi.register(name, email, password)
      .then(() => {
        onLogin({ email, password })
      })
      .catch((err) => {
        if (err === 409) {
          setSubmitError('Пользователь с таким email уже зарегестрирован');
        } else {
          setSubmitError('Ну вот, что-то пошло не так...');
        }
      });
  }

  // Авторизация пользователя
  const onLogin = (values) => {
    MainApi.login(values.email, values.password)
      .then(() => {
        setLoggedIn(true)
        history.push('/movies');
      })
      .catch((err) => {
        if (err === 401) {
          setSubmitError('Неверно введён email или пароль');
        }
        else {
          setSubmitError('Ну вот, что-то пошло не так...');
        }
      })
  }

  // Выход из аккаунта
  function onLogout() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    localStorage.removeItem('moviesArr');
    localStorage.removeItem('moviesOnSearch')
  }

  // редактирование данных пользователя
  const onEditProfile = (data) => {
    const jwt = localStorage.getItem('jwt')
    MainApi.editProfile(data, jwt)
      .then((res) => {
        setCurrentUser({
          name: res.name,
          email: res.email
        });
        setSubmitError('Данные изменены!')
      })
      .catch((err) => {
        setSubmitError('Ну вот, что-то пошло не так...')
      })
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
      if (moviesWhithLikeData) {
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

  const searchFunction = (searchedMovies, value) => searchedMovies.slice().filter((movie) => movie.nameRU.toLowerCase().includes(value.toLowerCase()))

  // поиск по фильмам
  const onSearchMovies = (value, searchedMovies) => {
    const searchResult = searchFunction(searchedMovies, value)
    setMovies(searchResult);
  }

  const onSearchSavedMovies = (value, savedMoviesForSearch) => {
    const searchResult = searchFunction(savedMoviesForSearch, value)
    setSavedMovies(searchResult)
  }
  // добавление фильма в избранное
  const onMovieLike = (movie) => {
    const jwt = localStorage.getItem('jwt');
    MainApi.addMovieToFavourites(movie, jwt)
      .then((newFavourite) => {
        const moviesWithLikes = movies.map((m) => m.id === newFavourite.movieId ? savedMovieAdapter(m) : m);

        setMovies(moviesWithLikes);
        setMoviesForSearch(moviesWithLikes);

        localStorage.setItem('moviesArr', JSON.stringify(moviesWithLikes));

        if (typeof newFavourite === 'object') {
          setSavedMovies([savedMovieAdapter(newFavourite), ...savedMovies]);
          setSavedMoviesForSearch([savedMovieAdapter(newFavourite), ...savedMovies]);
        }
      })
      .catch((err) => console.log(err))
  }
  // удаление лайка
  const onMovieDelete = (movie) => {
    const jwt = localStorage.getItem('jwt');
    MainApi.deleteMovieFromFavourites(movie._id, jwt)
    .then((deletedMovie) => {
      const newSavedMovies = savedMovies.filter((m) => m._id !== deletedMovie._id);
      const newAllMovies = movies.map((m) => m.id === deletedMovie.movieId ? movieAdapter(m) : m);

      setSavedMovies(newSavedMovies);
      setSavedMoviesForSearch(newSavedMovies);

      setMovies(newAllMovies);
      setMoviesForSearch(newAllMovies);

      localStorage.setItem('moviesArr', JSON.stringify(newAllMovies));
    })
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
            submitSpan={errors.submit}
          />

          <Route path="/signup">
            <Register
              onRegister={onRegister}
              submitError={errors.submit}
            />
          </Route>

          <Route path="/signin">
            <Login
              onLogin={onLogin}
              submitError={errors.submit}
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
