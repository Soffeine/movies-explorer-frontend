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
    // if(movie.hasOwnProperty('isLiked')) {
    //     const current = movie.isLiked;
    //     return {
    //         ...movie,
    //         isLiked: !current,
    //     }
    // }
    if(typeof movie === 'object') {
        return {
            ...movie,
            isLiked: true,
        }
    }
}