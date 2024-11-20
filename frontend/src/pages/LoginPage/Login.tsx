import { useState } from 'react';
import { Button } from '@fluentui/react-components';
import CustomInput from '../../components/CustomInput/CustomInput';
import { ArrowEnterRegular } from "@fluentui/react-icons";
import { useNavigate } from 'react-router-dom';
import { useLoginStyles } from './css/Login.const';
import { useAuth } from '../../context/authContext';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const style = useLoginStyles();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await login(email, password);
            setEmail('');
            setPassword('');
            navigate('/home');
        } catch (error) {
            
            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert('An unknown error occurred');
            }
        }
    };

    return (
        <>
        <div className={style.titleDiv}>
         <h1 className={style.title}>Bem vindo ao FlexIT</h1>
        </div>
        <div className={style.row}>
            <div className={style.box}>
                <h1 className={style.titleBox}>Login</h1>
                <CustomInput
                    about="Email"
                    placeholder='Digite seu email...'
                    className={style.customInput}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <CustomInput
                    type='password'
                    about="Senha"
                    placeholder='Digite sua senha...'
                    className={style.customInput}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    className={style.button}
                    appearance="secondary"
                    onClick={handleLogin}
                    icon={<ArrowEnterRegular />}
                >
                    Login
                </Button>
                <Button
                    className={style.button}
                    appearance="secondary"
                    onClick={() => navigate('/')}
                    icon={<ArrowEnterRegular />}
                >
                    Ir para registrar-se
                </Button>
            </div>
        </div>    
        </>
    );
}

export default Login;