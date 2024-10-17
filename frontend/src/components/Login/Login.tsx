import './Login.css';

function Login() {

	return (
        <div className='row'>
            <div className='box'> 
              <h1 className='label-h1' >Login</h1>
                <form className="login-form">
                    <div className="form-group">
                        <label className='label-input'>Email:</label>
                        <br />
                        <input
                            type="text"
                            name="email"
                            placeholder='Digite seu email...'
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label className='label-input'>Senha:</label>
                        <br />
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder='Digite sua senha...'
                        />
                    </div>
                    <button type="submit" className="btn-form">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;