import React from 'react';
import axios from 'axios';

class Interviews extends React.Component {
    constructor (props){
        super(props);
        this.state = {
            name:'Опрос',
            dateBegin: new Date(),
            dateEnd: new Date(),
            isActivated: true,
            inputList:[{ category: 1, question: "" }],
            audience:[],
            categories:[]
        }
    }
    componentDidMount(){
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
    handleRemoveClick(index){
        const list = [...this.state.inputList];
        list.splice(index, 1);
        this.setState({inputList:list})
      };
    handleAddClick(){
        this.setState({
            inputList: [...this.state.inputList, { category: 1, question: "" }]
        });
      };
    keyPress(e,i){
        if(e.keyCode == 13){
            e.preventDefault();
            if(i==this.state.inputList.length-1)
            this.handleAddClick();
        }
    }
    onSubmit=(e)=>{
        e.preventDefault();
        const obj=JSON.stringify(this.state);
        console.log(obj)
        console.log(this.state.inputList)
    }
    
    render (){
        return (
            <div className='app-container col-md-9 ml-sm-auto col-lg-10 px-md-4 mt-5'>
                <form onSubmit={(e) => this.onSubmit(e)}>
                <div className='header'>{this.state.name}</div>
                <div className='row date-toggle'>
                    <div className='col date-input'>
                        <label htmlFor='begin'>Дата начала</label>
                        <input type='date' required className='form-control' onChange={(e)=>this.onBeginChange(e)} id='begin' />
                    </div>
                    <div className='col date-input'>
                        <label htmlFor='end'>Дата окончания</label>
                        <input type='date' required className='form-control' onChange={(e)=>this.onEndChange(e)} id='end' />
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
                    
                {this.state.inputList.map((x, i) => {
                        return (
                        <div className="d-flex mb-3">
                            {this.state.inputList.length !== 1 && <img className='reorder-icon ' src='../../icons/reorder.svg' />}
                            <select 
                            className="custom-select category-input"
                            name="category"
                            value={x.category}
                            onChange={e => this.handleSelectChange(e, i)}>
                                {this.state.categories && this.state.categories.map(cat=> <option value={cat.id}>{cat.name}</option>)}
                            </select>
                            <input
                            className="question-input form-control"
                            name="question"
                            value={x.question}
                            required
                            placeholder='вопрос'
                            onKeyDown={e => this.keyPress(e,i)}
                            onChange={e => this.handleInputChange(e, i)}
                            />
                            <div className="btn-box mt-2">
                            {this.state.inputList.length !== 1 && <img className='clear-icon ' src='../../icons/clear.svg' onClick={() => this.handleRemoveClick(i)} />}
                            {this.state.inputList.length - 1 === i && <a className='primary-link ml-2' onClick={()=>this.handleAddClick()}>добавить</a>}
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

  export default Interviews;