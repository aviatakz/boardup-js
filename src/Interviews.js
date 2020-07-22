import React from 'react';


class Interviews extends React.Component {
    constructor (props){
        super(props);
        this.state = {
            activeClass:true,
            dateBegin: new Date(),
            dateEnd: new Date(),
            isActivated: true,
            inputList:[{ category: "", question: "" }]
        }
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
    handleInputChange = (e, index) => {
        const { name, value } = e.target;
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
        console.log('jopa');
        this.setState({
            inputList: [...this.state.inputList, { category: "", question: "" }]
        });
      };
      
    render (){
        return (
            <div className='app-container col-md-9 ml-sm-auto col-lg-10 px-md-4 mt-5'>
                <div className='header'>Опрос #1</div>
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
                    
                {this.state.inputList.map((x, i) => {
                        return (
                        <div className="d-flex mb-3">
                            {this.state.inputList.length !== 1 && <img className='reorder-icon ' src='reorder.svg' />}
                            <input
                            className='category-input form-control'
                            name="category"
                            value={x.category}
                            placeholder='категория'
                            onChange={e => this.handleInputChange(e, i)}
                            />
                            <input
                            className="question-input form-control"
                            name="question"
                            value={x.question}
                            placeholder='вопрос'
                            onChange={e => this.handleInputChange(e, i)}
                            />
                            <div className="btn-box mt-2">
                            {this.state.inputList.length !== 1 && <img className='clear-icon ' src='clear.svg' onClick={() => this.handleRemoveClick(i)} />}
                            {this.state.inputList.length - 1 === i && <a className='primary-link ml-2' onClick={()=>this.handleAddClick()}>добавить</a>}
                            </div>
                        </div>
                        );
                    })}
                    <div style={{ marginTop: 20 }}>{JSON.stringify(this.state.inputList)}</div>
                    <div className='row'>
                        <button type='submit' className='btn primary-btn'>Сохранить</button>
                    </div>
             
 
            </div>
        );
    }
}

  export default Interviews;