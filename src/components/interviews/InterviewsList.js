import React from 'react';
import { NavLink } from 'react-router-dom';
import Moment from 'react-moment';
import api from '../api';
import Dots from '../loader'


class InterviewsList extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            interviews: [],
            loading: true,
            deletedId: 0
        }
    }
    componentDidMount() {
        this._isMounted = true;
        api.get(`surveys/`)
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        interviews: response.data.sort((a, b) => (a.id > b.id) ? -1 : 1),
                        loading:false
                    })
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
    componentWillUnmount() {
        this._isMounted = false;
      }
    removeFromList(index, id) {
        const list = [...this.state.interviews];
        list.splice(index, 1);
        api.delete(`surveys/${id}`)
            .then(res => {
                console.log(res.data);
                this.setState({ interviews: list, deletedId: id })
            })
    };
    deleteAlert(){
        this.setState({
            deletedId: 0
        })
    }
    render() {
        if (this.state.loading) return <Dots />;
        let delete_info;
        if (this.state.deletedId !== 0){
            delete_info = <div className='col'><div className="alert fixed-top alert-danger" role="alert" onClick={() => this.deleteAlert()}>Опрос #{this.state.deletedId} удалён</div>                    </div>
        }
        return (
            <div className='app-container col-md-9 ml-sm-auto col-lg-10 px-md-4 mt-5'>
                <div className='row'>
                    <div className='col'>
                        <div className='header'>Список опросов</div>
                    </div>
                    {delete_info}
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