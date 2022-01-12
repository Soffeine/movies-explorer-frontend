import './App.css';
import { useEffect, useState } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
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
function App() {

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
        history.push('/movies')
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
      history.push('/movies');
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
          setMovieApiStatus(LoadingStatus.SUCCESSFUL)
          setMoviesForSearch(moviesRes);
          setMovies(moviesRes);
          setSavedMovies(savedMoviesRes);
          setSavedMoviesForSearch(savedMoviesRes);
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

      // добавление фильма в избранное
  // если лайка не было
  const onMovieLike = () => {
    MainApi.addMovieToFavourites()
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
          />
          <ProtectedRoute path="/saved-movies"
            component={SavedMovies}
            moviesArr={savedMovies}
            searchMoviesArr={savedMoviesForSearch}
            loggedIn={loggedIn}
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
