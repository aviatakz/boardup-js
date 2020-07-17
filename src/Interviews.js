import React from 'react';
import QuestionForm from './components/QuestionForm';


class Interviews extends React.Component {
    constructor (props){
        super(props);
        this.state = {
            activeClass:true,
            questionObjects:[],
            dateBegin: new Date(),
            dateEnd: new Date(),
            isActivated: true,
            submittedObj:{}
        }
    this.onFocus = this.onFocus.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onBeginChange=this.onBeginChange.bind(this);
    this.onEndChange=this.onEndChange.bind(this);
    this.removeQuestion=this.removeQuestion.bind(this);

}
   componentDidMount(){
       var firstDisabled=<QuestionForm onFocus={this.onFocus} isDisabled={true}/>
       this.setState({
        questionObjects:[...this.state.questionObjects, firstDisabled]
       })
   }
    onFocus=(e)=>{
        const newItem = <QuestionForm onFocus={()=>{return}} isDisabled={false} removeQuestion={this.removeQuestion} />;
        this.setState({
            questionObjects:[newItem,...this.state.questionObjects]
        })
        
    }
    
    onBeginChange=(e)=>{
        this.setState({
            dateBegin:e.target.value
        })
    }
    onEndChange=(e)=>{
        this.setState({
            dateEnd:e.target.value
        })
    }
    onSubmit=(e)=>{
        var questionsList=this.state.questionObjects;
        questionsList.pop();
        var submittedObj={
            dateBegin: this.state.dateBegin,
            dateEnd: this.state.dateEnd,
            submittedQuestions: questionsList,
            isActivated: this.state.isActivated
        }
        console.log(submittedObj.dateBegin,submittedObj.isActivated)
        this.setState({
            submittedObj:submittedObj
        })
    }
    removeQuestion(item){
      return;
    }
    handleClick=(event)=>{
        this.setState(state => ({
            isActivated: !state.isActivated
          }));  
        if(this.state.isActivated){
            this.setState({activeClass:false})
        } else{
            this.setState({activeClass:true})
        }   
    }
    render (){
        return (
            <div className='app-container col-md-9 ml-sm-auto col-lg-10 px-md-4 mt-5'>
                <div className='header'>Опрос #1</div>
                <form onSubmit={this.onSubmit}>
                <div className='row date-toggle'>
                    <div className='col date-input'>
                        <label for='begin'>Дата начала</label>
                        <input type='date' required className='form-control' onChange={this.onBeginChange} id='begin' />
                    </div>
                    <div className='col date-input'>
                        <label for='end'>Дата окончания</label>
                        <input type='date' required className='form-control' onChange={this.onEndChange} id='end' />
                    </div>
                    <div className='col toggle-content d-flex flex-column'>
                            <label for='toggle-switch'>Активен?</label>
                            <div className='switch-container mt-3'>
                            <label className="switch" >
                            <input id='toggle-switch' type="checkbox" onClick={this.handleClick} checked={this.state.isActivated} className="default"/>
                            <span className="slider round"></span>
                            </label>
                            </div>
                    </div>
                </div> 
                <div className='subtitle mt-4 mb-3'>Вопросы</div>
                    
                    {this.state.questionObjects.map((form,index) =>
                            <div>{form}</div>) }
                    
                    <div className='row'>
                        <button type='submit' className='btn primary-btn'>Сохранить</button>
                    </div>
             </form>
 
            </div>
        );
    }
}

  export default Interviews;