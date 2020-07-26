import React from 'react';
import data from './users';

class Groups extends React.Component {
    constructor (props){
        super(props);
        this.onChangeUser = this.onChangeUser.bind(this);

        this.state = {
            users: [],
            currentUser: {},
            list: []
        }
    }

    componentDidMount (){

        const stringified = JSON.stringify(data);
        const usersList = JSON.parse(stringified);
        const parsedList=[]
        
        for (let i = 0; i < usersList.length; i++) {
            let user = usersList[i];
            parsedList.push(user);
            console.log(user); 
          }       

        this.setState({users:parsedList});
        this.state.users.map((item) => console.log(item.username))

    }
    onChangeUser(e) {
        console.log(e.target.value.username)
        this.setState({
          currentUser: e.target.value
        })
      }
    addItem(e){
        e.preventDefault();
        const list = this.state.list;
        const newItem = this.state.currentUser;
        console.log(newItem.username)
        this.setState({
            list:[...this.state.list, newItem]
        })
    }
    render (){
        return (
            <div className='col-md-9 ml-sm-auto col-lg-10 px-md-4 mt-5'>
                <header>
                    <h3>Новая группа</h3>
                    <form className='form-inline mt-3' onSubmit={(e)=>{this.addItem(e)}}>
                        <div className='form-group'>
                            {/*<input type='text' placeholder='Имя' id='newItemInput' />*/}
                            <select
                                required
                                value={this.state.currentUser}
                                className="form-control"
                                onChange={this.onChangeUser}>
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
                        {this.state.list.map((item, index) =>
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