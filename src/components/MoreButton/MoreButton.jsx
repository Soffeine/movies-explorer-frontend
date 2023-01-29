import React from 'react';
import './MoreButton.css';

const MoreButton = ({ onShowMoreClick }) => {
    return (
        <button type="button" className="show-more-button" onClick={onShowMoreClick}>Ещё</button>
    )
};

export default MoreButton;