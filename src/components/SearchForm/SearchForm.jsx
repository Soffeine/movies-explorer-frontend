import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
    return (
        <section className="search-form">
            <form>
                <div className="search-form__container">
                   <div className="search-form__string">
                      <input type="text" className="search-form__input" 
                        placeholder="Фильм" minLength="2" maxLength="30" required />
                      <button className="search-form__button" type="submit">Поиск</button>
                    </div>
                    <div className="search-form__checkbox">
                    <FilterCheckbox />
                    <p className="search-form__checkbox-name">Короткометражки</p>
                    </div>
                </div>
            </form>
        </section>
    )
}

export default SearchForm;