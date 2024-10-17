import './HomePageButton.css';

interface HomePageButtonProps {
    redirectUrl: string;
    buttonText: string;
}

function HomePageButton({redirectUrl, buttonText }: HomePageButtonProps) {

    return (
        <div className="home-btn">
            <button type="button" className="btn-home" onClick={ () => {
                window.location.href = redirectUrl;
            }}>
            {buttonText}
            </button>
        </div>
    );
}

export default HomePageButton;