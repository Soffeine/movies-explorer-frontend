import './LogoButton.css';
import { Link } from 'react-router-dom';

function LogoButton() {
    return (
        <Link exact to="/" className="button_logo"></Link>
    )
}

export default LogoButton;