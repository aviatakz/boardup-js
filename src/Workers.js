import React from 'react';
import data from './users';
import Groups from "./Groups";
import Table from './components/Table'
class Workers extends React.Component {

    constructor (props){
        super(props);
        this.state = {
            users: [],
            showComponent: false
        }
        this._onButtonClick = this._onButtonClick.bind(this);
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
        this.state.users.map((item) => console.log(item.username))
        
    }

    _onButtonClick() {
        this.setState({
          showComponent: true,
        });
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
                                </tr>
                            </thead>                         
                        {/*Добавить удаление, редактирование, сверху кнопка создания нового юзера */}
                            <tbody>
                            {this.state.users.map((item) => 
                            <tr>
                                <td>{item.email}</td>
                                <td>{item.email}</td>
                                <td>{item.email}</td>
                                <td>{item.email}</td>

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