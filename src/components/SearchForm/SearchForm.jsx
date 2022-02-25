import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useState } from 'react';


function SearchForm({ handleCheckbox, onSearch, searchMoviesArr, checkboxStatus }) {

    const [value, setValue] = useState("");

    // функция записи значения инпута
    const handleChangeOnSearch = (e) => {
        e.persist();
        setValue(e.target.value)
    }


    // функция сабмита
    const handleSubmitOnSearch = (e, value, arr) => {
        e.preventDefault();
        onSearch(value, arr);
    }

    return (
        <section className="search-form">
            <form onSubmit={(e) => handleSubmitOnSearch(e, value, searchMoviesArr)}>
                <div className="search-form__container">
                    <div className="search-form__string">
                        <input
                            type="text"
                            className="search-form__input"
                            placeholder="Фильм"
                            maxLength="30"
                            value={value}
                            required
                            onChange={handleChangeOnSearch}
                        />
                        <button className="search-form__button" type="submit">Поиск</button>
                    </div>
                    <div className="search-form__checkbox">
                        <FilterCheckbox handleCheckbox={handleCheckbox} checkboxStatus={checkboxStatus} />
                        <p className="search-form__checkbox-name">Короткометражки</p>
                    </div>
                </div>
            </form>
        </section>
    )
}

export default SearchForm;