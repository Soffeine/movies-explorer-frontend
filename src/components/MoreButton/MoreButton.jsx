import React from 'react';
import './MoreButton.css';
import { useMoviesApi } from '../../utils/MoviesApi';
import { LoadingStatus } from '../../utils/constants';

const Preloader = ({ onShowMoreClick }) => {
    const { movieApiStatus } = useMoviesApi();
    
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
            <button type="button" className="preloader__show-more-button" onClick={onShowMoreClick}>Ещё</button>
        </div>
    )
};

export default Preloader;