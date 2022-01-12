import { useState } from "react";
import { LoadingStatus } from "./constants";
export const BASE_URL = 'https://api.nomoreparties.co';

// const getResponseData = (res) => {
//   return res.ok ? res.json() : Promise.reject(res.status);
// }

// export const getMovies = () => {
//   return fetch(`${BASE_URL}/beatfilm-movies`, {
//     method: 'GET',
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//     .then(getResponseData)
// }

//сделать кастомныйexport 

export const useMoviesApi = () => {
    const BASE_URL = 'https://api.nomoreparties.co';
  const [movieApiStatus, setMovieApiStatus] = useState(LoadingStatus.INNITIAL)
  const getResponseData = (res) => {
    return res.ok ? res.json() : Promise.reject(res.status);
  }

  const getMovies = () => {
    return fetch(`${BASE_URL}/beatfilm-movies`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(getResponseData)
  }

  return {getMovies, movieApiStatus, setMovieApiStatus}
}