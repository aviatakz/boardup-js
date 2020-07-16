import React from 'react';
import {NavLink} from 'react-router-dom';

class Navbar extends React.Component {
    render (){
        return (
                <nav id='sidebarMenu' className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
                   <div className='sidebar-sticky'>
                    <ul className="nav flex-column">
                    <li className="nav-item ml-2">
                        <a className="nav-link semibold pb-3" href="#">                    
                        <NavLink activeStyle={{ color:"#00BC00" }} to='/profile'>Ксения</NavLink>
                        </a>
                    <div className='border mb-3 ml-3'></div>
                    </li>
                    
                    <li className="nav-item ml-2">
                        <a className="nav-link" href="#"><NavLink activeStyle={{ color:"#00BC00" }} exact to='/interviews'>Опросы</NavLink>
                        </a>
                    </li>
                    <li className="nav-item ml-2">
                        <a class="nav-link" href="#"><NavLink activeStyle={{ color:"#00BC00" }} to='/workers'>Пользователи</NavLink></a>
                    </li>
                    <li className="nav-item ml-2">
                        <a className="nav-link" href="#"><NavLink activeStyle={{ color:"#00BC00" }} exact to='/groups'>Группы</NavLink></a>
                    </li>
                    <li className="nav-item active ml-2">
                        <a className="nav-link" href="#"><NavLink activeStyle={{ color:"#00BC00" }} to='/settings'>Настройки</NavLink></a>
                    </li>
                    </ul>
                    </div>
                </nav>  
        );
    }
}

  export default Navbar;