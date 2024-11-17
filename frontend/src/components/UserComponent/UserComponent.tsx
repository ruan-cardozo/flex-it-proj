import { Persona, PersonaProps } from "@fluentui/react-components";
import React, { useState, useRef } from "react";
import { getUserFromLocalStorage } from "../../utils/get-user-from-local-storage";

interface User {
    name: string;
    email: string;
    sub: number;
}

const UserComponent: React.FC<PersonaProps> = (props) => {
    const [avatarSrc, setAvatarSrc] = useState(
        "https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/office-ui-fabric-react-assets/persona-male.png"
    );
    const [user, setUser] = useState<User | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarSrc(reader.result as string);
                // Aqui você pode salvar a imagem no localStorage ou sessionStorage
                localStorage.setItem("avatarSrc", reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    React.useEffect(() => {
        const handleUserLoggedIn = () => {
            const user = getUserFromLocalStorage();
            if (user) {
                setUser(user);
            }
        };

        handleUserLoggedIn();
    }, []);

    React.useEffect(() => {
        const savedAvatarSrc = localStorage.getItem("avatarSrc");
        if (savedAvatarSrc) {
            setAvatarSrc(savedAvatarSrc);
        }
    }, []);

    return (
        <>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
            />
            <Persona
                primaryText={{
                    children: user?.name, 
                    style: { color: 'white' } 
                }}
                secondaryText={{
                    children: user?.email,
                    style: { color: 'white' },
                }}
                avatar={{
                    image: {
                        src: avatarSrc,
                        onClick: handleImageClick,
                        style: { cursor: "pointer" },
                    },
                }}
                {...props}
            />
        </>
    );
};

export default UserComponent;
