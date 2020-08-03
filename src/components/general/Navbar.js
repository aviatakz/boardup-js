import React from 'react';
import { NavLink } from 'react-router-dom';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.activeStyle = {
            color: '#00BC00',
        };
    }
    render() {
        return (
            <nav id='sidebarMenu' className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
                <div className='sidebar-sticky'>
                    <ul className="nav flex-column">
                        <li className="nav-item ml-2">
                            <NavLink activeStyle={this.activeStyle} className='nav-link semibold pb-3' to='/profile'>Ксения</NavLink>
                            <div className='border mb-3 ml-3'></div>
                        </li>

                        <li className="nav-item ml-2">
                            <NavLink activeStyle={this.activeStyle} className='nav-link' exact to='/interviews'>Опросы</NavLink>
                        </li>
                        <li className="nav-item ml-2">
                            <NavLink activeStyle={this.activeStyle} className='nav-link' to='/workers'>Пользователи</NavLink>
                        </li>
                        <li className="nav-item ml-2">
                            <NavLink activeStyle={this.activeStyle} className='nav-link' exact to='/groups'>Группы</NavLink>
                        </li>
                        <li className="nav-item active ml-2">
                            <NavLink activeStyle={this.activeStyle} className='nav-link' to='/settings'>Настройки</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Navbar;