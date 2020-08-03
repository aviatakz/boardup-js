import React from 'react';
import axios from 'axios';
import { apiUrl } from '../api';

const api = apiUrl;

class AudienceCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            survey_id: this.props.match.params.survey_id,
            user_id: this.props.match.params.user_id,
            user: {},
            reviews: [],
            groupMembers: [],
            value: { email: '' },
            suggestions: []
        }
    }
    componentDidMount() {
        axios.get(`${api}/users/${this.state.user_id}`)
            .then(response => {
                this.setState({
                    user: response.data
                })
            })
            .then(res => {
                const info = this.state.user.groups.map(g => g.id);
                const PromiseArr = [];
                let results = []
                for (let i = 0; i < info.length; i++) {

                    let url = api + "/users/?groups=" + info[i]
                    PromiseArr.push(
                        axios.get(url).then(result => results = result.data))
                }

                Promise.all(PromiseArr).then(res => {
                    this.setState({
                        groupMembers: results.map(r => ({ ...r, isInGroup: true })).filter(f => f.id != this.state.user_id)
                    })
                    console.log(results)
                    console.log(this.state.groupMembers)
                    this.state.groupMembers.forEach(i => console.log(i.email))
                });
            }
            ).catch(err => { console.log(err) })

        axios.get(`${api}/users/`)
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data,
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }
    onAutoChange = e => {
        this.items = this.state.users.map(u => u);
        const value = e.target.value;
        const regex = new RegExp(`^${value}`, 'i');
        const suggestions = value.length > 0 ? this.items.sort().filter(v => regex.test(v.email)) : []

        this.setState(() => ({ suggestions, value: value }));

    }
    renderSuggestions() {
        const { suggestions } = this.state;
        if (suggestions.length === 0) {
            return null;
        }
        return (
            <ul>
                {suggestions.map(item => <li onClick={() => this.suggestionSelected(item)}>{item.email}</li>)}
            </ul>
        )
    }
    suggestionSelected = value => {
        this.setState(() => ({
            value: value,
            suggestions: []
        }))
    }
    moveFromGroup = user => {
        this.setState({

            groupMembers: this.state.groupMembers.filter(function (item) {
                return item !== user;
            }),
            reviews: [...this.state.reviews, user]
        });
    }
    removeFromReviews = user => {
        this.setState({
            reviews: this.state.reviews.filter(function (item) {
                return item !== user;
            }),
            groupMembers: user.isInGroup ? [...this.state.groupMembers, user] : this.state.groupMembers
        });
    }
    submitInput() {
        this.moveFromGroup(this.state.value)
    }
    saveAudience() {
        const reviews = this.state.reviews;
        reviews.forEach(function (v) { delete v.isInGroup });
    }
    render() {
        const { value, suggestions } = this.state;
        const inputProps = {
            placeholder: 'some@aviata.me',
            value,
            onChange: this.onChange
        };
        return (
            <div className='app-container col-md-9 ml-sm-auto col-lg-10 px-md-4 mt-5'>
                <div className='row'>
                    <div className='header'>Аудитория {this.state.user && this.state.user.email}:</div>
                </div>
                <div className='row'>
                    <div className='col members-list'>
                        <label>Оценивает:</label>
                        <ul className='list-unstyled'>
                            {this.state.reviews && this.state.reviews.map(item =>
                                <div className='member-container d-flex mb-2'>
                                    <div className='bg-white li'><li>{item.email}</li></div>
                                    <img className='clear-icon' src='../../../icons/clear.svg' onClick={() => this.removeFromReviews(item)} />
                                </div>
                            )}
                        </ul>
                        <button type='submit' className='btn primary-btn mt-2' onClick={() => this.saveAudience()}>Сохранить</button>
                    </div>

                    <div className='col members-list'>
                        <label>Предложенные:</label>
                        <ul className='list-unstyled'>
                            {this.state.groupMembers && this.state.groupMembers.map((item) =>
                                <div className='member-container d-flex mb-2'>
                                    <img className='arrow-icon' src='../../../icons/arrow-left.svg' onClick={() => this.moveFromGroup(item)} />
                                    <div className='bg-white li'><li>{item.email}</li></div>
                                </div>
                            )}
                        </ul>
                        <div>
                            <label>Добавить пользователя:</label>
                            <div className='member-container d-flex align-items-start mb-2'>
                                <img className='arrow-icon mt-2' src='../../../icons/arrow-left.svg' onClick={() => this.submitInput()} />
                                <div className='autocomplete'>
                                    <input className='bg-white form-control li' value={this.state.value.email} placeholder='some@aviata.me' onChange={e => this.onAutoChange(e)} />
                                    {this.renderSuggestions()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AudienceCreate;