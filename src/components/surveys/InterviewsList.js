import React from 'react';
import { NavLink } from 'react-router-dom';
import Moment from 'react-moment';
import axios from 'axios';
import { apiUrl } from '../api';

const api = apiUrl;

class InterviewsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            interviews: []
        }
    }

    componentDidMount() {
        axios.get(`${api}/surveys/`)
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        interviews: response.data.map(int => int)
                    })
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
    removeFromList(index, id) {
        const list = [...this.state.interviews];
        list.splice(index, 1);
        axios.delete(`${api}/surveys/${id}`)
            .then(res => {
                console.log(res.data);
                this.setState({ interviews: list })
            })
    };
    render() {
        return (
            <div className='app-container col-md-9 ml-sm-auto col-lg-10 px-md-4 mt-5'>
                <div className='row'>
                    <div className='col'>
                        <div className='header'>Список опросов</div>
                    </div>
                    <div className='col'>
                        <NavLink to='/interviews/new' className='primary-link float-right mt-3'>создать</NavLink>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>активен?</th>
                                    <th>начало</th>
                                    <th>окончание</th>
                                    <th>аудитория</th>
                                    <th>кол-во вопросов</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.interviews && this.state.interviews.map((item, i) =>
                                    <tr key={item.id}>
                                        <td><NavLink to={"interviews/" + item.id + '/edit'}>{'#' + item.id}</NavLink></td>
                                        <td><img src={item.is_active ? '../../icons/tick.svg' : '../../icons/clear.svg'} /></td>
                                        <td><Moment format="DD.MM.YYYY">{item.start_date}</Moment></td>
                                        <td><Moment format="DD.MM.YYYY">{item.end_date}</Moment></td>
                                        <td><NavLink to={'audience/' + item.id}>посмотреть</NavLink></td>
                                        <td>{item.questions && item.questions.length}</td>
                                        <td>
                                            <img src='../../icons/navigation.svg' className="dropdown-toggle" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                                <a className="dropdown-item border-bottom">дублировать</a>
                                                <a className="dropdown-item text-danger active-click" onClick={() => this.removeFromList(i, item.id)}>удалить</a>
                                            </div>
                                        </td>
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

export default InterviewsList;