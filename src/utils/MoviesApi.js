import { useState } from "react";
import { LoadingStatus } from "./constants";
export const BASE_URL = 'https://api.nomoreparties.co';

export const useMoviesApi = () => {
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
      .then(setMovieApiStatus(LoadingStatus.SUCCESSFUL))
      .catch((err) => {
        setMovieApiStatus(LoadingStatus.FAILURE)
      })
  }

  return {getMovies, movieApiStatus, setMovieApiStatus}
}