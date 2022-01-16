export const movieAdapter = (movie) => {
    if(typeof movie === 'object') {
        return {
            ...movie,
            isLiked: false,
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