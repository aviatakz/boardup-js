import React from 'react';
import data from './users';
import Groups from "./Groups";
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
            <div className='container mt-5'>
                <div className='row'>
                    <div className='col'>
                        Сотрудники:  
                        <ul className='list-group mt-3'>
                            {/*Добавить удаление, редактирование, сверху кнопка создания нового юзера */}
                            {this.state.users.map((item) => <li className='list-group-item' key={item.id}>{item.username+' '+item.email}</li>)}
                        </ul>
                    </div>
                    <div className='col'>
                    <button onClick={this._onButtonClick} type="button" class="btn btn-success">Создать группу</button>
                    {this.state.showComponent ?
                        <Groups /> :
                        null
                    }
                    </div>
               </div>
            </div>
        );
    }
}

  export default Workers;