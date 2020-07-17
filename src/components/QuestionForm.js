import React from 'react';


const QuestionForm= (props)=> {
    return (
        <div className={'row questions questions-form mb-3 '+(props.isDisabled ? 'disabled-form' : null)}>
            <div className='col question d-flex flex-row'>
                <img className={'reorder-icon '+(props.isDisabled ? 'hidden' : 'show')} src='reorder.svg'></img>
                <input type='text' required onFocus={ () => props.onFocus()} className='category-input form-control' readOnly={props.isDisabled} placeholder='категория' />
            </div>
            <div className='col question d-flex flex-row'>
                <input type='text' required onFocus={ () => props.onFocus()} className='question-input form-control' readOnly={props.isDisabled} placeholder='Вопрос'/>
                <img className={'clear-icon '+(props.isDisabled ? 'hidden' : 'show')} src='clear.svg'></img>
            </div>
        </div>
    );
  }

  export default QuestionForm;