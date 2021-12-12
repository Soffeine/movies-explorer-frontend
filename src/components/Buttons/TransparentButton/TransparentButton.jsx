import './TransparentButton.css';
import { NavLink } from "react-router-dom";

const TransparentButton = ({ text, to }) => {
    return (
        <NavLink to={to} className="button button_transparent">{text}</NavLink>
    );
}

export default TransparentButton;