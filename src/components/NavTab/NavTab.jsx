import './NavTab.css';
import Button from '../Buttons/Button';
import { ButtonType, ButtonText, RouteTo } from '../../utils/constants.js';

function NavTab() {
    return (
        <nav className="promo__links">
            <Button type={ButtonType.GRAY} text={ButtonText.ABOUT_PROJECT} to={RouteTo.ABOUT_PROJECT} />
            <Button type={ButtonType.GRAY} text={ButtonText.TECHS} to={RouteTo.TECHS} />
            <Button type={ButtonType.GRAY} text={ButtonText.STUDENT} to={RouteTo.ABOUT_ME} />
        </nav>
    );
}

export default NavTab;