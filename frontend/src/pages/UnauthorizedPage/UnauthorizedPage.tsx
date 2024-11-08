import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton, Stack, Text } from '@fluentui/react';

const UnauthorizedPage: React.FC = () => {
    const navigate = useNavigate();

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    return (
        <Stack horizontalAlign="center" verticalAlign="center" styles={{ root: { height: '100vh' } }}>
            <Text variant="xxLarge" block styles={{ root: { fontSize: '48px' } }}>
                Acesso Negado
            </Text>
            <br />
            <br />
            <Text variant="large" block styles={{ root: { fontSize: '24px' } }}>
                Você não tem permissão para acessar esta página. Por favor, faça login primeiro.
            </Text>
            <br />
            <PrimaryButton text="Ir para Login" onClick={handleLoginRedirect} styles={{ root: { fontSize: '20px', padding: '20px 40px' } }} />
        </Stack>
    );
};

export default UnauthorizedPage;