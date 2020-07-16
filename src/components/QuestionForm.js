import React from 'react';


const QuestionForm= (props)=> {

    return (
        <div className='row questions questions-form mb-3'>
            <div className='col question d-flex flex-row'>
                <input type='text' onFocus={ () => props.onFocus()} className='category-input form-control' placeholder='категория' />
            </div>
            <div className='col question d-flex flex-row'>
                <input type='text'  onFocus={ () => props.onFocus()} className='question-input form-control' placeholder='Вопрос'/>
            </div>
        </div>
    );
  }

  export default QuestionForm;