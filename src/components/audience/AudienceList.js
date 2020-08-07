import React from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { apiUrl } from '../api';
import Dots from '../loader'

const api = apiUrl;

class AudienceList extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            survey_id: this.props.match.params.survey_id,
            reviews: [],
            tergeted: [],
            loading: true
        }
    }

    componentDidMount() {
        this._isMounted = true;

        axios.get(`${api}/users/`)
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data.map(u => u).sort((a, b) => (a.id > b.id) ? 1 : -1)
                    })
                }
            })
            .then(res=>{
                const info = this.state.users;
                const PromiseArr = [];
                let results = []
                for (let i = 0; i < info.length; i++) {
                    let url = api + "/interviews/?user=" + info[i].id + '&survey=' + parseInt(this.state.survey_id)
                    PromiseArr.push(
                        axios.get(url).then(result => {
                            results.push({length:result.data.length, user_email:info[i].email, user_id: info[i].id})
                        }))
                }
                Promise.all(PromiseArr).then(res => {
                    console.log(this.state.survey_id)
                    this.setState({
                        reviews: results
                    })
                }); 

            })
            .then(res=>{
                const info = this.state.users;
                const PromiseArr = [];
                let results = []
                for (let i = 0; i < info.length; i++) {
                    let url = api + "/interviews/?target_user=" + info[i].id + '&survey=' + parseInt(this.state.survey_id)
                    PromiseArr.push(
                        axios.get(url).then(result => {
                            results.push({length:result.data.length, user_email:info[i].email, user_id: info[i].id})
                        }))
                }
                Promise.all(PromiseArr).then(res => {
                    this.setState({
                        targeted: results,
                        loading:false
                    })

                }); 
            })
            .catch(error => {
                console.log(error);
            })  
    }
    componentWillUnmount() {
        this._isMounted = false;
      }

    render() {
        const reviews = this.state.reviews
        const targets = this.state.targeted
        if (this.state.loading) return <Dots />;
        return (
            <div className='app-container col-md-9 ml-sm-auto col-lg-10 px-md-4 mt-5'>
                <div className='row'>
                    <div className='col'>
                    <div className='header'>Аудитория опроса #{this.state.survey_id}</div>
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
                                {reviews && reviews.map((item, i) =>
                                    <tr key={item.user_id}>
                                        <td className=''>{item.user_email}</td>
                                        <td>{item.length}</td>
                                        <td>{targets && targets.find(el => {return el.user_id===item.user_id}).length}</td>
                                        <td>{item.length!==0 ? <NavLink to={'/audience/' + this.state.survey_id + '/' + item.user_id + '/edit'}>редактировать</NavLink> : <NavLink to={'/audience/' + this.state.survey_id + '/' + item.user_id + '/new'}>создать</NavLink>}</td>
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