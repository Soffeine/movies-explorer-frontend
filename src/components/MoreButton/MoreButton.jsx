import React from 'react';
import './MoreButton.css';

const MoreButton = ({ onShowMoreClick }) => {
    return (
        <button type="button" className="show-more-button" onClick={onShowMoreClick}>Ещё</button>
    )
};

export default MoreButton;

//solid
//сделать два компонента
// if(fetching) {
  //  Preloader
//} else if (film counter <=  arr.length) {
    // return button MORE
//}