import { Button, makeStyles } from '@fluentui/react-components';
import CustomInput from '../../components/CustomInput/CustomInput';
import { ArrowEnterRegular } from "@fluentui/react-icons";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { register } from '../../api/register';
import { useToast } from '../../context/ToastContext';
import { AxiosError } from 'axios';

const useStylesCustomInput = makeStyles({
    row: {
        maxWidth: '100%',
        maxHeight: '100%',
        marginTop: '400px',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
    },
    customInput: {
        boxShadow: '0 0 8px rgba(0,0,0,0.24) 0 14px 28px rgba(0,0,0,0.28)',
        padding: '10px',
        color: 'white',
        width: '500px',
        height: '50px',
        fontSize: '16px',
        fontWeight: 'bold',
        marginTop: '12px',
        marginBottom: '12px',
       },
       box: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
        width: '600px',
        padding: '20px',
        backgroundColor: '#0f6cbd',
        marginTop: '-300px',
        height: '500px',
        borderRadius: '20px',
       }, 
       title: {
        display: 'flex',
        fontSize: '80px',
        marginTop: '5%',
        textAlign: 'center',
        alignItems: 'center',
       },
        button: {
         backgroundColor: '#0f6cbd',
         color: 'white',
         padding: '10px',
         borderRadius: '20px',
         marginTop: '30px',
         marginLeft: '20px',
         width: '200px',
        },
        titleBox: {
            color: 'white',
            fontSize: '50px',
        },
        titleDiv: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }
});

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { showToast } = useToast();

    const handleRegister = async () => {
        try {
          const userData = { name, email, password };
          const data = await register(userData);
        
          if (data && data.status === 201) {

            showToast('Usuário cadastrado com sucesso!', 'success');

            setName('');
            setEmail('');
            setPassword('');
          }

        } catch (error) {
          if (error instanceof Error) {
            const axiosError = error as AxiosError;
            showToast((axiosError.response?.data as { message: string }).message, 'error');
          } else {
            console.error('An unknown error occurred');
          }
        }
      };

    const style = useStylesCustomInput();
    const navigate = useNavigate();
	return (
    <>
    <div className={style.titleDiv}>
            <h1 className={style.title}>Bem vindo ao FlexIT</h1>
        </div>
        <div className={style.row}>
        <div className={style.box}>
            <h1 className={style.titleBox}>Registre-se</h1>
            <CustomInput 
                about="Email" 
                placeholder='Digite seu email...' 
                className={style.customInput}
                value={email} 
                onChange={(e) => setEmail(e.target.value)} />
            <CustomInput 
                about="Nome" 
                placeholder='Digite seu nome...' 
                className={style.customInput} 
                value={name}
                onChange={(e) => setName(e.target.value)} />
            <CustomInput 
                type='password' 
                about="Senha" 
                placeholder='Digite sua senha...' 
                className={style.customInput}
                value={password} 
                onChange={(e) => setPassword(e.target.value)} />
            <Button className={style.button} appearance="secondary" onClick={handleRegister} icon={<ArrowEnterRegular />}>Registrar-se</Button>
            <Button className={style.button} appearance="secondary" onClick={() => navigate('/login')} icon={<ArrowEnterRegular />}>Ir para o login</Button>
        </div>
        </div>
    </>        
    );
}

export default Register;