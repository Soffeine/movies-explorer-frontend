import './Input.css';

function Input({ text, type, name }) {
    return (
      <div className="input">
          <label className="input__label">{text}</label>
          <input className="input__field" type={type} name={name} required/>
          <span className="input__error-span"></span>
      </div>
    )
}

export default Input;