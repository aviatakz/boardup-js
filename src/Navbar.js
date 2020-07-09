import React from 'react';
import {Link} from 'react-router-dom';

class Navbar extends React.Component {
    render (){
        return (
            <div>
                <nav className="navbar navbar-default navbar-expand-lg navbar-dark bg-dark">
                   
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0 ml-5">
                    <Link to='/'> 
                    <a className="navbar-brand" href="#">
                        <img src="360.png" width="40" height="40"  alt="" /> 
                          Method360
                    </a>
                    </Link>
                    <Link to='/workers'>
                    <li className="nav-item ml-5">
                        <a className="nav-link" href="#">Сотрудники</a>
                    </li>
                    </Link>
                    <Link to='/groups'>
                    <li className="nav-item ml-3">
                        <a class="nav-link" href="#">Группы</a>
                    </li>
                    </Link>
                    <Link to='/interviews'>
                    <li className="nav-item ml-3">
                        <a className="nav-link" href="#">Опросники</a>
                    </li>
                    </Link>
                    <Link to='/profile'>
                    <li className="nav-item active ml-3">
                        <a className="nav-link" href="#">Мой профиль</a>
                    </li>
                    </Link>
                    </ul>
                </nav>  
            </div>
        );
    }
}

  export default Navbar;