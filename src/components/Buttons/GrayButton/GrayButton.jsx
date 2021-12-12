import './GrayButton.css';

function GrayButton({ text, to }) {
    return (
        <a href={to} className="button_gray">{text}</a>
    );
}

export default GrayButton;