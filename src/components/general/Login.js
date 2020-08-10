import React from 'react';
import axios from 'axios';
import { apiUrl } from '../api';

const api = apiUrl;
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }
    onUsernameChange = (e) => {
        this.setState({
            username: e.target.value
        })
    }
    onPasswordChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    onFormSubmit = (e) => {
        const user = {
            username: this.state.username,
            password: this.state.password
        }
        console.log(user)
        axios.post(`${api}/auth/login/`, user)
            .then(res => console.log(res))
    }
    render (){
        return (
            <div className='app-container col-md-9 ml-sm-auto col-lg-10 px-md-4 mt-5 d-flex justify-content-center'>
                <section class="form-elegant">
                    <div class="card">
                    <div class="card-body mx-4">
                        <div class="text-center">
                        <h3 class="dark-grey-text mb-5"><strong>Вход</strong></h3>
                        </div>
                        <div class="md-form">
                        <label for="Form-username1">Username</label>
                        <input type="text" id="Form-username1" class="form-control mb-2" value={this.state.username} onChange={e => this.onUsernameChange(e)} />
                        </div>
                        <div class="md-form pb-3">
                        <label for="Form-pass1">Пароль</label>
                        <input type="password" id="Form-pass1" class="form-control mb-3" value={this.state.password} onChange={e => this.onPasswordChange(e)} />
                        </div>
                        <div class="text-center mb-3">
                        <button type="button" class="btn blue-gradient btn-block btn-rounded z-depth-1a" onClick={e => this.onFormSubmit(e)}>Войти</button>
                        </div>
                    </div>
                    </div>
               </section> 
            </div>
        );
    }
}

  export default Login;