import React from 'react';
import auth from '../auth'
import api from '../api';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: false
        }
    }
    onUsernameChange = e => {
        this.setState({
            username: e.target.value
        })
    }
    onPasswordChange = e => {
        this.setState({
            password: e.target.value
        })
    }
    onFormSubmit = e => {
        e.preventDefault()
        const user = {
            username: this.state.username,
            password: this.state.password
        }
        api.post(`auth/login/`, user)
            .then(res => {
                if (res.status === 200) {
                    auth.login(() => {
                        this.props.history.push("/interviews");
                    });
                    console.log('success')
                    localStorage.setItem("login_data", this.state.username + ':' + this.state.password);
                    this.props.handleAuth(res.data)
                }
            }
            )
            .catch(err => {
                this.setState({
                    error: true
                })
            })
    }
    render() {
        let errorMsg;
        if (this.state.error) {
            errorMsg = <div className="alert alert-danger" role="alert">Неверный логин или пароль</div>
        }
        return (
            <div className='app-container col-md-9 ml-sm-auto col-lg-10 px-md-4 mt-5 d-flex justify-content-center mx-auto align-items-center'>
                <section className="form-elegant mt-5">
                    <div className="card mt-3">
                        <div className="card-body mx-4">
                            <div className="text-center">
                                <h3 className="dark-grey-text mb-5"><strong>Вход</strong></h3>
                            </div>
                            <div className="md-form">
                                <label htmlFor="Form-username1">Username</label>
                                <input type="text" id="Form-username1" className="form-control mb-2" value={this.state.username} onChange={e => this.onUsernameChange(e)} />
                            </div>
                            <div className="md-form pb-3">
                                <label htmlFor="Form-pass1">Пароль</label>
                                <input type="password" id="Form-pass1" className="form-control mb-3" value={this.state.password} onChange={e => this.onPasswordChange(e)} />
                            </div>
                            <div className="text-center mb-3">
                                <button type="button" className="btn blue-gradient btn-block btn-rounded z-depth-1a" onClick={e => this.onFormSubmit(e)}>Войти</button>
                            </div>
                            {errorMsg}
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Login;