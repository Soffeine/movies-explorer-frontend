import './UserWelcomeMessage.css';

function UserWelcomeMessage({ text }) {
    return(
        <h2 className="welcome-message">{text}</h2>
    )
}

export default UserWelcomeMessage;