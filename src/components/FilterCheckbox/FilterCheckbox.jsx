import './FilterCheckbox.css';

function FilterCheckbox({handleCheckbox}) {
    const onCheckboxChange = () => handleCheckbox((prev) => !prev)
    return (
        <label className="checkbox">
            <input className="checkbox__input" type="checkbox" defaultChecked onChange={onCheckboxChange} />
            <span className="checkbox__slider"></span>
        </label>
    )
}

export default FilterCheckbox