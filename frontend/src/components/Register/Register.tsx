import './Register.css';

function Register() {
	return (
        <div className='row'>
            <div className='box'> 
                <form className="register-form">
                    <div className="form-group">
                        <label>Nome:</label>
                        <br />
                        <input
                            type="text"
                            name="name"
                            placeholder='Digite seu nome...'
                            className="form-control"
                            value=''
                            
                        />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <br />
                        <input
                            type="text"
                            name="email"
                            placeholder='Digite seu email...'
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Senha:</label>
                        <br />
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder='Digite sua senha...'
                        />
                    </div>
                    <button type="submit" className="btn-form">Registrar</button>
                </form>
            </div>
        </div>
    );
}

export default Register;