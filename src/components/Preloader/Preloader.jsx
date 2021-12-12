import React from 'react';
import './Preloader.css';

const Preloader = () => {
    return (
        <div className="preloader">
            <div className="preloader__container">
                <span className="preloader__round"></span>
            </div>
            <button type="button" className="preloader__show-more-button">Ещё</button>
        </div>
    )
};

export default Preloader;