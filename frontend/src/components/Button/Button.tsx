import './Button.css';

interface ButtonProps {
    text: string;
    onClick: () => void;
    icon?: string; 
}

function Button({ text, onClick, icon }: ButtonProps) {
    return (
        <button onClick={onClick} className='button-1'>
            {icon && <img src={icon} alt="icon" className="button-icon" />}
            {text}
        </button>
    );
}

export default Button;