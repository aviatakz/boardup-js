import React from 'react';
import data from './users';

class Groups extends React.Component {
    constructor (props){
        super(props);
        this.state = {
            users: [],
            currentUser: {}
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

        this.setState({users:parsedList, currentUser:parsedList[0]});
        this.state.users.map((item) => console.log(item.username))

    }

    render (){
        return (
            <div className='container mt-5'>
                <header>
                    <h3>Новая группа</h3>
                    <form className='form-inline mt-3'>
                        <div className='form-group'>
                            <label className='sr-only' htmlFor='newItemInput'>Добавить сотрудника</label>
                            {/*<input type='text' placeholder='Имя' id='newItemInput' />*/}
                            <select ref="userInput"
                                required
                                className="form-control"
                                value={this.state.currentUser.username+' '+this.state.currentUser.email}
                                onChange={this.onChangeUsername}>
                                {
                                    this.state.users.map(function(user) {
                                    return <option 
                                        key={user.id}
                                        value={user}>{user.username+' '+user.email}
                                        </option>;
                                    })
                                }
                            </select>
                        </div>
                        <button type='submit' className='btn btn-outline-success ml-3'>Добавить</button>
                    </form>
                </header>
                <table className="table mt-3">
                    <thead className="thead-dark">
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Имя</th>
                        <th scope="col">Email</th>
                        <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map((item, index) =>
                        <tr key={item.id}>
                        <th scope="row">{index+1}</th>
                        <td>{item.username}</td>
                        <td>{item.email}</td>
                        <td className='text-right'>
                            <button type='button' className='btn btn-default btn-sm'>
                            Удалить
                            </button>
                        </td>
                        </tr>
                        )} 
                    </tbody>
                    </table>
            </div>
        );
    }
}

  export default Groups;