import './BlueButton.css';

function BlueButton({ text, disabled }) {
    return (
        <button className={(`button_blue ${disabled ? '' : 'button_blue_disabled'}`)} type="submit" disabled={disabled}>{text}</button>
    )
}

export default BlueButton;