import React from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { apiUrl } from '../api';

const api = apiUrl;

class AudienceList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            survey_id: this.props.match.params.survey_id
        }
    }

    componentDidMount() {

        axios.get(`${api}/users/`)
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data.map(u => u)
                    })
                    console.log(this.props)
                }
            })
            .catch(error => {
                console.log(error);
            })

    }

    render() {
        return (
            <div className='app-container col-md-9 ml-sm-auto col-lg-10 px-md-4 mt-5'>
                <div className='row'>
                    <div className='col'>
                        <div className='header'>Аудитория опроса</div>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>пользователь</th>
                                    <th>он оценивает</th>
                                    <th>его оценивают</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.users.map((item) =>
                                    <tr key={item.id}>
                                        <td>{item.email}</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td><NavLink to={'/audience/' + this.state.survey_id + '/' + item.id + '/new'}>создать</NavLink></td>
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

export default AudienceList;