import React from 'react';
import auth from '../auth'
import { NavLink, withRouter } from 'react-router-dom';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.activeStyle = {
            color: '#00BC00'
        };
        this.state = {
            username: '',
            isLoggedIn: false
        }
    }
    componentDidMount(){
        console.log(this.props.isLoggedIn)
        console.log(auth.isAuthenticated())
            this.setState({
                isLoggedIn: this.props.isLoggedIn,
                username: this.props.username
            })
            console.log(this.state.isLoggedIn)
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            isLoggedIn:nextProps.isLoggedIn,
            username: nextProps.username
        })
    }
    
    render() {
        let quitBtn;
        if(this.state.isLoggedIn){
            quitBtn = <li className="nav-item mt-2 mx-2"><a className='nav-link semibold pb-3' onClick={() => this.props.handleQuit(this.props.history)}>Выйти</a></li>
        }
        return (
            <nav id='sidebarMenu' className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
                <div className='sidebar-sticky'>
                    <ul className="nav flex-column">
                        <li className="nav-item ml-2">
                            <NavLink activeStyle={this.activeStyle} className='nav-link semibold pb-3' to='/profile'>{this.state.username}</NavLink>
                            <div className='border mb-3 ml-3'></div>
                        </li>
                        <li className="nav-item ml-2">
                            <NavLink activeStyle={this.activeStyle} className='nav-link' exact to='/interviews'>Опросы</NavLink>
                        </li>
                        <li className="nav-item ml-2">
                            <NavLink activeStyle={this.activeStyle} className='nav-link' to='/users'>Пользователи</NavLink>
                        </li>
                        <li className="nav-item ml-2">
                            <NavLink activeStyle={this.activeStyle} className='nav-link' exact to='/groups'>Группы</NavLink>
                        </li>
                        <li className="nav-item active ml-2">
                            <NavLink activeStyle={this.activeStyle} className='nav-link' to='/settings'>Настройки</NavLink>
                        </li>
                        {quitBtn}
                    </ul>
                </div>
            </nav>
        );
    }
}

export default withRouter(Navbar);