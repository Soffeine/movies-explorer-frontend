export const movieAdapter = (movie) => {
    if(typeof movie === 'object') {
        return {
            ...movie,
            isLiked: false,
            movieId: movie.id,
        }
    }
}

export const savedMovieAdapter = (movie) => {
    if(typeof movie === 'object') {
        return {
            ...movie,
            isLiked: true,
        }
    }
}