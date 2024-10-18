interface HeaderProps {
    title: string;
    className: string;
}

function Header({title, className}: HeaderProps) {
    return (
        <h1 className={className} >{title}</h1>
    );
}

export default Header;