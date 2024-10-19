import { CSSProperties } from "react";

interface HeaderProps {
    title: string;
    style?: CSSProperties;
}

function Header({title, style}: HeaderProps) {
    return (
        <h1 style={style} >{title}</h1>
    );
}

export default Header;