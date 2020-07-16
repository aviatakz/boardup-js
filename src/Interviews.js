import React from 'react';
import QuestionForm from './components/QuestionForm';


class Interviews extends React.Component {
    constructor (props){
        super(props);
        this.state = {
            isToggleOn: true, activeClass:true, questionForms:[]
        }
    this.onFocus = this.onFocus.bind(this);
    }
   
    onFocus=(e)=>{
        this.setState({
            showComponent: true,
          });
    }
    handleClick=(event)=>{
        this.setState(state => ({
            isToggleOn: !state.isToggleOn
          }));  
        if(this.state.isToggleOn){
            this.setState({activeClass:false})
        } else{
            this.setState({activeClass:true})
        }   
    }
    render (){
        return (
            <div className='app-container col-md-9 ml-sm-auto col-lg-10 px-md-4 mt-5'>
                <div className='header'>Опрос #1</div>
                <div className='row date-toggle'>
                    <div className='col date-input'>
                        <label for='begin'>Дата начала</label>
                        <input type='date' required className='form-control' id='begin' />
                    </div>
                    <div className='col date-input'>
                        <label for='end'>Дата окончания</label>
                        <input type='date' required className='form-control' id='end' />
                    </div>
                    <div className='col toggle-content d-flex flex-column'>
                            <label for='toggle-switch'>Активен?</label>
                            <div className='switch-container mt-3'>
                            <label className="switch" >
                            <input id='toggle-switch' type="checkbox" onClick={this.handleClick} checked={this.state.isToggleOn} className="default"/>
                            <span className="slider round"></span>
                            </label>
                            </div>
                    </div>
                </div> 
                <div className='subtitle mt-4 mb-3'>Вопросы</div>
                    <div className='row questions mb-3'>
                        <div className='col question d-flex flex-row'>
                            <img className='reorder-icon' src='reorder.svg'></img>
                            <input type='text'  className='category-input form-control' placeholder='категория' value='Инициативность'/>
                        </div>
                        <div className='col question d-flex flex-row'>
                            <input type='text'  className='question-input form-control' placeholder='Вопрос' value='Вопрос'/>
                            <img className='clear-icon' src='clear.svg'></img>
                        </div>
                    </div>
                    <div className='row questions mb-3'>
                        <div className='col question d-flex flex-row'>
                            <img className='reorder-icon' src='reorder.svg'></img>
                            <input type='text'  className='category-input form-control' placeholder='категория' value='Смелость'/>
                        </div>
                        <div className='col question d-flex flex-row'>
                            <input type='text'  className='question-input form-control' placeholder='Вопрос' value='Вопрос'/>
                            <img className='clear-icon' src='clear.svg'></img>
                        </div>
                    </div>
                    <QuestionForm onFocus = {this.onFocus} />
                    {this.state.showComponent ?
                        <QuestionForm onFocus = {this.onFocus}/> :
                        null
                    }
                    <div className='row'>
                        <button className='btn primary-btn'>Сохранить</button>
                    </div>
            </div>
        );
    }
}

  export default Interviews;