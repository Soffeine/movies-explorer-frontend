// preloader
// error showing
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
// import * as MoviesApi from '../../utils/MoviesApi.js';
import { useMoviesApi } from '../../utils/MoviesApi.js';
import { LoadingStatus } from '../../utils/constants';
import { movieAdapter, savedMovieAdapter } from '../../utils/movieAdapter';

export function App() {

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

  const { getMovies, setMovieApiStatus } = useMoviesApi();


  // получение фильмов с сервера при монтировании
  useEffect(() => {
    if (loggedIn) {
      setMovieApiStatus(LoadingStatus.FETCHING)
      const token = localStorage.getItem('jwt');
      Promise.all([getMovies(), MainApi.getSavedMovies(token)])
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
  }, [loggedIn])

  // поиск по фильмам
  const onSearchMovies = (value, searchedMovies) =>
    setMovies(searchedMovies.filter((movie) => movie.nameRU.toLowerCase().includes(value.toLowerCase())))

  const onSearchSavedMovies = (value, savedMoviesForSearch) =>
    setSavedMovies(savedMoviesForSearch.filter((movie) => movie.nameRU.toLowerCase().includes(value.toLowerCase())))

  //фильм должен менять значение лайка на противоположное
  // фронт отправляет на бэк фильм с новым значением лайка
  // бэк получает фильм и смотрит значение 
  // если лайк есть - записать фильм в монгоДБ и вернуть фильм с новым статусом на фронт
  // если нет  - найти фильм по айди и удалить, отправить на фронт с отсутствующим статусом
  // не забыть сделать новый стейт массива с фильмами
  //
  // добавление фильма в избранное
  // const onMovieLike = (movie) => {
  //   const jwt = localStorage.getItem('jwt');
  //   if (movie.isLiked) {
  //     const movieId = movie.movieId;
  //     MainApi.deleteMovieFromFavourites(movieId, jwt)
  //       .then((deletedMovie) => {
  //         if (location.pathname === '/movies') {
  //           setMovies((movies) => movies.map((movie) => {
  //             if (movie.id === deletedMovie.movieId) {
  //               return movieAdapter(deletedMovie);
  //             }
  //             return movie;
  //           }
  //           ))
  //         }
  //         setSavedMovies(savedMovies.filter((movie) => deletedMovie.movieId !== movie.id))
  //       })
  //       .catch((err) => { console.log(err) })
  //   } else {
  //     MainApi.addMovieToFavourites(movie, jwt)
  //       .then((newFavourite) => {
  //         setMovies((movies) => movies.map((movie) => {
  //           if (movie.id === newFavourite.movieId) {
  //             return savedMovieAdapter(newFavourite);
  //           }
  //           return movie;
  //         }))
  //         if (typeof newFavourite === 'object') {
  //           setSavedMovies([savedMovieAdapter(newFavourite), ...savedMovies])
  //         }
  //       })
  //       .catch((err) => console.log(err))
  //   }
  // }

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
        }))
        if (typeof newFavourite === 'object') {
          setSavedMovies([savedMovieAdapter(newFavourite), ...savedMovies])
        }
      })
      .catch((err) => console.log(err))
  }

  // const onMovieDelete = (movie) => {
  //   const jwt = localStorage.getItem('jwt');
  //   MainApi.deleteMovieFromFavourites(movie.movieId, jwt)
  //     .then((deletedMovie) => {
  //       if (location.pathname === '/movies') {
  //         setMovies((movies) => movies.map((movie) => {
  //           if (movie.id === deletedMovie.movieId) {
  //             return movieAdapter(deletedMovie);
  //           }
  //           return movie;
  //         }
  //         ))
  //       } else {
  //         setSavedMovies(savedMovies.filter((movie) => deletedMovie.movieId !== movie.id))
  //       }
  //     })
  //     .catch((err) => { console.log(err) })
  // }

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
          />
          <ProtectedRoute path="/saved-movies"
            component={SavedMovies}
            moviesArr={savedMovies}
            searchMoviesArr={savedMoviesForSearch}
            loggedIn={loggedIn}
            onMovieLike={onMovieLike}
            onMovieDelete={onMovieDelete}
          />
          <ProtectedRoute path="/profile"
            component={Profile}
            onEditProfile={onEditProfile}
            onSignout={onLogout}
            loggedIn={loggedIn}
            onSearch={onSearchSavedMovies}
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
