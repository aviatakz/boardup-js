import React from 'react';
import {NavLink} from 'react-router-dom';
import Moment from 'react-moment';

class InterviewsList extends React.Component {
    constructor (props){
        super(props);
        this.state = {
            interviews: [
            { id : 1,
              isActivated: true,
              dateBegin: <Moment format="DD.MM.YYYY">
              2020-04-19
          </Moment>,
              dateEnd: <Moment format="DD.MM.YYYY">
              2020-04-25
          </Moment>,
              audience: 180,
              questionsAmount: 17
            },
            {
                id : 2,
                isActivated: false,
                dateBegin: <Moment format="DD.MM.YYYY">
                2020-04-25
            </Moment>,
                dateEnd: <Moment format="DD.MM.YYYY">
                2020-04-30
            </Moment>,
                audience: 190,
                questionsAmount: 19
            }
          ]
        }
    }

    componentDidMount (){
        
    }
    render (){
        return (
            <div className='app-container col-md-9 ml-sm-auto col-lg-10 px-md-4 mt-5'>
                <div className='row'>
                    <div className='col'>
                    <div className='header'>Список опросов</div>
                    </div>
                    <div className='col'>
                    <NavLink to='/api/interviews/new' className='primary-link float-right mt-3'>создать</NavLink>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <table className='table'>   
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>активен?</th>
                                    <th>начало</th>
                                    <th>окончание</th>
                                    <th>аудитория</th>
                                    <th>кол-во вопросов</th>
                                    <th></th>
                                </tr>
                            </thead>                         
                            <tbody>
                            {this.state.interviews.map((item) => 
                            <tr>
                                <td><NavLink to='/api/interviews'>{'#'+item.id}</NavLink></td>
                                <td><img src={item.isActivated ? '../../icons/tick.svg':'../../icons/clear.svg'} /></td>
                                <td>{item.dateBegin}</td>
                                <td>{item.dateEnd}</td>
                                <td><NavLink to='/api/audience'>{item.audience}</NavLink></td>
                                <td>{item.questionsAmount}</td>
                                <td>
                                    <img src='../../icons/navigation.svg' className="dropdown-toggle" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                        <NavLink to='/interviews' className="dropdown-item border-bottom">дублировать</NavLink>
                                        <NavLink to='/interviews' className="dropdown-item text-danger">удалить</NavLink>
                                    </div>
                                </td>
                            </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
               </div>
               
            </div>
        );
    }
}

  export default InterviewsList;