import { Button, makeStyles } from '@fluentui/react-components';
import CustomInput from '../../components/CustomInput/CustomInput';
import { ArrowEnterRegular } from "@fluentui/react-icons";

const useStylesCustomInput = makeStyles({
    row: {
        maxWidth: '100%',
        maxHeight: '100%',
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
        marginBottom: '20px',
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
        marginLeft: '1050px',
        marginTop: '-300px',
        height: '450px',
        borderRadius: '20px',
       }, 
       title: {
        display: 'flex',
        fontSize: '80px',
        marginTop: '300px',
        textAlign: 'center',
        alignItems: 'center',
        marginLeft: '200px',
       },
        button: {
         backgroundColor: '#0f6cbd',
         color: 'white',
         padding: '10px',
         borderRadius: '20px',
         marginTop: '45px',
         marginLeft: '20px',
         width: '200px',
        },
        titleBox: {
            color: 'white',
            fontSize: '50px',
        }
});

function Login() {

    const style = useStylesCustomInput();

	return (
        <div className={style.row}>
            <div>
                <h1 className={style.title}>Bem vindo ao <br /><br /><br /><br /><br /> FlexIT</h1>
            </div>
            <div className={style.box}>
                <h1 className={style.titleBox}>Login</h1>
                <CustomInput about="Email" placeholder='Digite seu email...' className={style.customInput} />
                <CustomInput type='password' about="Senha" placeholder='Digite sua senha...' className={style.customInput} />
                <Button className={style.button} appearance="secondary" onClick={() => 'teste'} icon={<ArrowEnterRegular />}>Login</Button>
            </div>
        </div>
    );
}

export default Login;