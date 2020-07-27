import React from 'react';
import axios from 'axios';

class Audience extends React.Component {
    constructor (props){
        super(props);
        this.state={
            users:[],
            user: {
                id: 1,
                email: '',
                reviews: [],
                group: '',
                groupMembers: []
            },
            value:'',
            suggestions:[]
        }
    }
    componentDidMount(){
        const user={
            email: 'vlad@aviata.me',
            reviews: [{email:'ksenya.v@aviata.kz'},{email:'alena@aviata.me'},{email:'dauren@chocotravel.com'},{email:'david@chocotravel.com'}],
            group: 'top',
            groupMembers:[{email: 'kanat@aviata.me'},{email:'shaken@chocotravel.com'},{email:'ayuna@aviata.me'}]
        }
        this.setState({
            user:user
        })
        axios.get('http://46.101.246.71:8000/users/')
            .then(response => {
                if (response.data.length > 0) {
                this.setState({
                    users: response.data.map(user => user.email),
                })
                console.log(this.state.users)
                }
            })
            .catch((error) => {
                console.log(error);
            })
        this.state.user.reviews.forEach(item=>console.log(item))
    }
    onAutoChange = (e) =>{
        this.items=this.state.users;

        const value=e.target.value;
        let suggestions=[];
        if(value.length>0){
            const regex=new RegExp(`^${value}`,'i');
            suggestions=this.items.sort().filter(v=>regex.test(v));
        }

        this.setState(()=>({suggestions, value:value}));
        
    }
    renderSuggestions(){
        const {suggestions}=this.state;
        if(suggestions.length===0){
            return null;
        }
        return(
            <ul>
                {suggestions.map((item)=><li onClick={()=>this.suggestionSelected(item)}>{item}</li>)}
            </ul>
        )
    }
    suggestionSelected = (value) =>{
        this.setState(()=>({
            value:value,
            suggestions:[]
        }))
    }
    moveFromGroup = (user) => {
        this.setState({
            user: {
            ...this.state.user,
            groupMembers: this.state.user.groupMembers.filter(function(item) {
              return item !== user;
            }),
            reviews: [...this.state.user.reviews, user]
         }});
        
          this.state.user.reviews.forEach(item=>console.log(item))
          this.state.user.groupMembers.forEach(item=>console.log(item))
    }
    removeFromReviews = (user) => {
        this.setState({
            user: {
            ...this.state.user,
            reviews: this.state.user.reviews.filter(function(item) {
              return item !== user;
            })
         }});
    }
    submitInput(){
        this.moveFromGroup(this.state.value)
    }
    render (){
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
                        {this.state.user.reviews && this.state.user.reviews.map(item=>
                            <div className='member-container d-flex mb-2'>
                            <div className='bg-white li'><li>{item.email}</li></div>
                            <img className='clear-icon'src='../../icons/clear.svg' onClick={()=>this.removeFromReviews(item)} />
                            </div>
                            )}
                        </ul>
                        <button type='submit' className='btn primary-btn mt-2'>Сохранить</button>
                    </div>
                    
                    <div className='col members-list'>
                        <label>Группа <b>{this.state.user.group}</b>:</label>
                        <ul className='list-unstyled'>
                        {this.state.user.group && this.state.user.groupMembers.map((item)=>
                            <div className='member-container d-flex mb-2'>
                            <img className='arrow-icon'src='../../icons/arrow-left.svg' onClick={()=>this.moveFromGroup(item)}/>
                            <div className='bg-white li'><li>{item.email}</li></div>
                            </div>
                            )}
                        </ul>
                        <div>
                        <label>Добавить пользователя:</label>
                        <div className='member-container d-flex align-items-start mb-2'>
                        <img className='arrow-icon mt-2'src='../../icons/arrow-left.svg' onClick={()=>this.submitInput()}/>
                        <div className='autocomplete'>
                        <input className='bg-white form-control li' value={this.state.value} placeholder='some@aviata.me' onChange={e=>this.onAutoChange(e)} />
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

  export default Audience;