import './FilterCheckbox.css';

function FilterCheckbox({ handleCheckbox, checkboxStatus }) {
    return (
        <label className="checkbox">
            <input className="checkbox__input" type="checkbox" checked={checkboxStatus} onChange={handleCheckbox} />
            <span className="checkbox__slider"></span>
        </label>
    )
}

export default FilterCheckbox;