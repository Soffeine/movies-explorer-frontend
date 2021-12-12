import './Promo.css';
import MainTitle from '../MainTitle/MainTitle';
import NavTab from '../NavTab/NavTab';

function Promo() {
    return (
        <section className="promo">
            <MainTitle text="Учебный проект студента факультета Веб-разработки." />
            <NavTab />
        </section>
    );
};

export default Promo;