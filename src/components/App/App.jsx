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
import * as MoviesApi from '../../utils/MoviesApi.js';

function App() {

  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [movies, setMovies] = useState({});


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
      .then((res) => {
        setLoggedIn(true)
        history.push('/movies')
      })
      .catch((err) => { console.log(err) })
  }

  // Выход из аккаунта
  function onLogout () {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
  }

  // редактирование данных пользователя
  const onEditProfile = () => { }

  // проверка авторизиции и получение данных пользователя при монтировании
  const authCheck = (jwt) => {
    return MainApi.getUserData(jwt)
      .then((data) => {
        setLoggedIn(true);
        setCurrentUser(data)
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

  // получение фильмов с сервера при монтировании
  // useEffect(() => {
  //   if (loggedIn) {
  //     const token = localStorage.getItem('jwt');
  //     Promise.all([])
  //     .then([])
  //   }
  // }, [])

  // поиск по фильмам

  // фильтрация короткометражек

  // добавление фильма в избранное

  // удаление фильма из избранного 

  // 



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
          />
          <ProtectedRoute path="/saved-movies"
            component={SavedMovies}
            loggedIn={loggedIn}
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
