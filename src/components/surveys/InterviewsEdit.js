import React from 'react';
import axios from 'axios';
import Moment from 'react-moment';

class InterviewsEdit extends React.Component {
    constructor (props){
        super(props);
        this.state = {
            id: 0,
            name:'Опрос',
            start_date: new Date(),
            end_date: new Date(),
            isActivated: true,
            inputList:[{ category_id: 1, description: ""}],
            audience:[],
            categories:[]
        }
    }
    componentDidMount(){
        axios.get('http://46.101.246.71:8000/surveys/'+this.props.match.params.id)
        .then(response => {
            console.log(response)
                this.setState({
                    id: response.data.id,
                    name: response.data.name,
                    start_date: this.formatDate(new Date(response.data.start_date).toDateString()),
                    end_date: this.formatDate(new Date(response.data.end_date).toDateString()),
                    inputList:response.data.questions ? response.data.questions : [{ category_id: 1, description: "", survey_id: this.state.id }],
                    isActivated: response.data.is_active
                })
               
            })
       
        .catch(function (error) {
          console.log(error);
        })
        
        axios.get('http://46.101.246.71:8000/categories/')
            .then(response => {
                if (response.data.length > 0) {
                this.setState({
                    categories: response.data.map(cat => cat)
                })
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }
    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }
    onBeginChange=(e)=>{
        this.setState({
            start_date:e.target.value
        })
    }
    onEndChange=(e)=>{
        this.setState({
            end_date:e.target.value
        })
    }
    handleSwitchChange=()=>{
        this.setState(state => ({
            isActivated: !state.isActivated
          }));    
    }
    handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...this.state.inputList];
        list[index][name] = value;
        this.setState({inputList:list})
      };
    handleSelectChange = (e, index) => {
        const name = e.target.name;
        const value = parseInt(e.target.value);
        const list = [...this.state.inputList];
        list[index][name] = value;
        this.setState({inputList:list})
      };
    removeFromList(index){
        const list = [...this.state.inputList];
        list.splice(index, 1);
        this.setState({inputList:list})
      };
    addToList(){
        this.setState({
            inputList: [...this.state.inputList, { category_id: 1, description: "" }]
        });
      };
    keyPress(e,i){
        if(e.keyCode == 13){
            e.preventDefault();
            if(i==this.state.inputList.length-1)
            this.addToList();
        }
    }
    onSubmit=(e)=>{
        e.preventDefault();
        const ordered=this.state.inputList.map(question=>({ ...question, order: 0 }))
        const questions=ordered.map(question=>({ ...question, survey_id: this.state.id }))
        questions.forEach(e=>console.log(e.category_id+e.description+e.survey_id+e.order));

        const survey={
            name: this.state.name,
            start_date: new Date(this.state.start_date).toISOString(),
            end_date: new Date(this.state.end_date).toISOString(),
            is_active: this.state.isActivated,
        }
        
        console.log(survey)
        
        axios.put('http://46.101.246.71:8000/surveys/'+this.props.match.params.id, survey)
                .then((response) => {
                    console.log(response);
                  });
               
    }
   
    render (){
        return (
            <div className='app-container col-md-9 ml-sm-auto col-lg-10 px-md-4 mt-5'>
                <form onSubmit={(e) => this.onSubmit(e)}>
                <div className='header'>Редактировать {this.state.name}</div>
                <div className='row date-toggle'>
                    <div className='col date-input'>
                        <label htmlFor='begin'>Дата начала</label>
                        <input type='date' required className='form-control' value={this.state.start_date} onChange={(e)=>this.onBeginChange(e)} id='begin' />
                    </div>
                    <div className='col date-input'>
                        <label htmlFor='end'>Дата окончания</label>
                        <input type='date' required className='form-control' value={this.state.end_date} onChange={(e)=>this.onEndChange(e)} id='end' />
                    </div>
                    <div className='col toggle-content d-flex flex-column'>
                            <label htmlFor='toggle-switch'>Активен?</label>
                            <div className='switch-container mt-3'>
                            <label className="switch" >
                            <input id='toggle-switch' type="checkbox" onClick={()=>this.handleSwitchChange()} checked={this.state.isActivated} className="default"/>
                            <span className="slider round"></span>
                            </label>
                            </div>
                    </div>
                </div> 
                <div className='subtitle mt-4 mb-3'>Вопросы</div>
                    
                {this.state.inputList && this.state.inputList.map((x, i) => {
                        return (
                        <div className="d-flex mb-3">
                            {this.state.inputList.length !== 1 && <img className='reorder-icon ' src='../../icons/reorder.svg' />}
                            <select 
                            className="custom-select category-input"
                            name="category_id"
                            value={x.category_id}
                            onChange={e => this.handleSelectChange(e, i)}>
                                {this.state.categories && this.state.categories.map(cat=> <option value={cat.id}>{cat.name}</option>)}
                            </select>
                            <input
                            className="question-input form-control"
                            name="description"
                            value={x.description}
                            required
                            placeholder='вопрос'
                            onKeyDown={e => this.keyPress(e,i)}
                            onChange={e => this.handleInputChange(e, i)}
                            />
                            <div className="btn-box mt-2">
                            {this.state.inputList.length !== 1 && <img className='clear-icon ' src='../../icons/clear.svg' onClick={() => this.removeFromList(i)} />}
                            {this.state.inputList.length - 1 === i && <a className='primary-link ml-2' onClick={()=>this.addToList()}>добавить</a>}
                            </div>
                        </div>
                        );
                    })}
                    <div className='row'>
                        <button type='submit' className='btn primary-btn save-btn'>Сохранить</button>
                    </div>
                    </form>
 
            </div>
        );
    }
}

  export default InterviewsEdit;