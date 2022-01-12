export const BASE_URL = 'https://api.beatfilm.sof.nomoredomains.work';

const getResponseData = (res) => {
    return res.ok ? res.json() : Promise.reject(res.status);
}

// регистрация
export const register = (name, email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ name, email, password })
    })
        .then(getResponseData)
};

// авторизация
export const login = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ email, password })
    })
        .then(getResponseData)
        .then((data) => {
            localStorage.setItem('jwt', data.token);
        })
};

// получение данных о пользователе
export const getUserData = (jwt) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`
        },
        credentials: 'include',
    })
        .then(getResponseData)
};

// редактирование данных профиля
export const editProfile = (data, jwt) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${jwt}`
        },
        body: JSON.stringify({ 
            name: data.name,
            email: data.email
        })
    })
        .then(getResponseData)
};

// получение всех сохраненных пользователем фильмов
export const getSavedMovies = (jwt) => {
    return fetch(`${BASE_URL}/movies`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${jwt}`
        },
    })
        .then(getResponseData)
}

// сохранение фильма в избранное
export const addMovieToFavourites = (item, jwt) => {
    return fetch(`${BASE_URL}/movies`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${jwt}`
        },
        body: JSON.stringify({
            country: item.country,
            director: item.director,
            duration: item.duration,
            year: item.year,
            description: item.description,
            image: item.image,
            trailer: item.trailer,
            nameRU: item.nameRU,
            nameEN: item.nameEN,
            thumbnail: item.thumbnail,
            movieId: item.movieId,
            owner: item.owner,
        })
    })
    .then(getResponseData)
}

// удаление фильма из избранного
export const deleteMovieFromFavourites = (movieId, jwt) => {
    return fetch(`${BASE_URL}/movies/${movieId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${jwt}`
        },
    })
    .then(getResponseData)
}
