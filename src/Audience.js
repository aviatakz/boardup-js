import React from 'react';

class Audience extends React.Component {
    constructor (props){
        super(props);
        this.state={
            user: {
                id: 1,
                email: '',
                reviews: [],
                group: '',
                groupMembers: []
            }
        }
        this.state.user.reviews.forEach((item)=>console.log(item.email))
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
        this.state.user.reviews.forEach(item=>console.log(item))
    }
    moveFromGroup(user){
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
    removeFromReviews(user){
        this.setState({
            user: {
            ...this.state.user,
            reviews: this.state.user.reviews.filter(function(item) {
              return item !== user;
            })
         }});
    }
    render (){
        return (
            <div className='app-container col-md-9 ml-sm-auto col-lg-10 px-md-4 mt-5'>
                <div className='row'>
                    <div className='header'>Аудитория {this.state.user && this.state.user.email}:</div>
                </div> 
                <div className='row'>
                    <div className='col members-list'>
                        <label>Оценивает:</label>
                        <ul className='list-unstyled'>
                        {   this.state.user.reviews && this.state.user.reviews.map(item=>
                            <div className='member-container d-flex mb-2'>
                            <div className='bg-white li'><li>{item.email}</li></div>
                            <img className='clear-icon'src='../clear.svg' onClick={()=>this.removeFromReviews(item)} />
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
                            <img className='arrow-icon'src='../arrow-left.svg' onClick={()=>this.moveFromGroup(item)}/>
                            <div className='bg-white li'><li>{item.email}</li></div>
                            </div>
                            )}
                        </ul>
                        <div>
                        <label>Добавить пользователя:</label>
                        <div className='member-container d-flex mb-2'>
                        <img className='arrow-icon'src='../arrow-left.svg' />
                        <input className='bg-white form-control li' value='some@aviata.me' />
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

  export default Audience;