import React from 'react';
import './MoreButton.css';
import { useMoviesApi } from '../../utils/MoviesApi';
import { LoadingStatus } from '../../utils/constants';

const Preloader = () => {
    const { movieApiStatus } = useMoviesApi();
    // функция onClick
    // пропадание кнопки, когда массив заканчивается
    // перенести этот компонент в кардлист

    if (movieApiStatus === LoadingStatus.FETCHING) {
        return (
            <div className="preloader">
                <div className="preloader__container">
                    <span className="preloader__round"></span>
                </div>
            </div>
        )
    }

    return (
        <div className="preloader">
            <button type="button" className="preloader__show-more-button">Ещё</button>
        </div>
    )
};

export default Preloader;