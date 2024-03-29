import './Input.css';

function Input({ text, type, name, onChange, errorMessage, value }) {
    return (
      <div className="input">
          <label className="input__label">{text}</label>
          <input className="input__field" type={type} name={name} onChange={onChange} value={value} required />
          <div className="input__error-container"><p className="input__error-message">{errorMessage}</p></div>
      </div>
    )
}

export default Input;