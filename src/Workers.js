import React from 'react';
import data from './users';
import Table from './components/Table'
import {NavLink} from 'react-router-dom';

class Workers extends React.Component {

    constructor (props){
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount (){

        var stringified = JSON.stringify(data);
        const usersList = JSON.parse(stringified);
        var parsedList=[]
        
        for (var i = 0; i < usersList.length; i++) {
            var user = usersList[i];
            parsedList.push(user);
            console.log(user); 
          }       

        this.setState({users:parsedList});
        this.state.users.forEach((item) => console.log(item.username))
        
    }

    render (){
        return (
            <div className='app-container col-md-9 ml-sm-auto col-lg-10 px-md-4 mt-5'>
                <div className='row'>
                    <div className='col'>
                        <div className='header'>Аудитория опроса</div>
                        <table className='table'>   
                            <thead>
                                <tr>
                                    <th>пользователь</th>
                                    <th>группы</th>
                                    <th>он оценивает</th>
                                    <th>его оценивают</th>
                                    <th></th>
                                </tr>
                            </thead>                         
                        {/*Добавить удаление, редактирование, сверху кнопка создания нового юзера */}
                            <tbody>
                            {this.state.users.map((item) => 
                            <tr>
                                <td>{item.email}</td>
                                <td>{item.group}</td>
                                <td className={item.target==0 ? 'text-danger':'regular'}>{item.target}</td>
                                <td className={item.targetedBy==0 ? 'text-danger':'regular'}>{item.targetedBy}</td>
                            <td><NavLink to='/interviews'>{item.targetedBy==0 ? 'создать':'редактировать'}</NavLink></td>
                            </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                    
               </div>
            </div>
        );
    }
}

  export default Workers;