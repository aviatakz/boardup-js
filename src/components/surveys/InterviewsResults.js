import React from 'react';
import RadarChart from 'react-svg-radar-chart';
import 'react-svg-radar-chart/build/css/index.css';
import axios from 'axios';
import api from '../api';
import { SpecialArray } from './SpecialArray';
import Dots from '../loader'

class InterviewsResults extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user_id: this.props.match.params.user_id,
            email:'',
            survey_id: this.props.match.params.survey_id,
            selfs: {},
            colleagues: {},
            company: {},
            categories:{},
            targeted_by:[],
            comments:[],
            isActivatedColleagues: true,
            isActivatedCompany: true,
            isActivatedYours: true,
            loading: true,
            dataset:[]
        }
    }
   
    componentDidMount(){
        api.get(`users/${this.state.user_id}`)
            .then(res => this.setState({email:res.data.email}))
            .catch(err => console.log(err))

        api.get(`interviews/results/?user_id=${this.state.user_id}&survey_id=${this.state.survey_id}`)
             .then(res => {
                 if(res.data){
                     console.log(res.data)
                     this.setState({
                         categories: Object.assign({}, ...res.data.categories.map(object => ({[object.id]: object.name}))),
                         colleagues: Object.assign({}, ...res.data.colleagues.map(object => ({[object.question__category]: object.avg/10}))),
                         selfs: Object.assign({}, ...res.data.self.map(object => ({[object.question__category]: object.avg/10}))),
                         company: Object.assign({}, ...res.data.company.map(object => ({[object.question__category]: object.avg/10})))
                     })
                     const emptyData=[]
                     const categories=this.state.categories
                     let emptyData_filled = new SpecialArray;
                     emptyData_filled.push(categories).push(emptyData).toArray()
                     this.setState({ dataset: [...this.state.dataset, {data:emptyData, meta:{color:'white'}}] })
                 }
             })
        api.get(`interviews/?survey=41&target_user=16`)
             .then(res => {
                 this.setState({
                     targeted_by: res.data.map(el => el.user.email),
                     comments: res.data.map(el => el.comment),
                     loading:false
                 })
             })
             .catch(err => console.log(err))
    }
    handleYour = () => {
        const categories=this.state.categories;
        const current_dataset=this.state.dataset;
        const selfs=this.state.selfs;
        let self_filled = new SpecialArray;
        self_filled.push(categories).push(selfs).toArray();
        const self_dataset={data:selfs,meta:{color:'red'}};
        
        current_dataset.findIndex(self_dataset)

        this.setState(state => ({
            isActivatedYours: !state.isActivatedYours,
        }));
        if(this.state.isActivatedYours){
            this.setState({
                dataset: [...this.state.dataset, self_dataset]
            })
        }else{
            this.setState({
                dataset: this.state.dataset.filter(function (item) {
                    return item !== self_dataset;
                })
            })
        }
    }
    handleColleagues = () => {
        const categories=this.state.categories;
        const colleagues=this.state.colleagues;
        let colleagues_filled = new SpecialArray;
        colleagues_filled.push(categories).push(colleagues).toArray()

        this.setState(state => ({
            isActivatedColleagues: !state.isActivatedColleagues
        }));
    }
    handleCompany = () => {
        const categories=this.state.categories;
        const company=this.state.company;
        let company_filled = new SpecialArray;
        company_filled.push(categories).push(company).toArray()

        this.setState(state => ({
            isActivatedCompany: !state.isActivatedCompany
        }));
    }
    render (){
    
      let chart;
        
        const dataset=this.state.dataset
        const categories=this.state.categories

        const data = dataset;
          chart=<RadarChart
          captions={categories}
          data={data} 
          options={{dots:true, zoomDistance:1.2, scales:10, captionMargin:115}}
          size={440}
        />
        
        if (this.state.loading) return <Dots />;
          return (
            <div className='app-container chart col-md-9 ml-sm-auto col-lg-10 px-md-4'>
                <div className='header mt-5 mb-0'>{this.state.email} #{this.state.survey_id}</div>
                <div className='row'>
                    <div className='col col-chart'>
                    {chart}
                    <div className='row'>
                        <div className='col switch-col'>
                        <div className='row'>
                        <div className='col'>
                            <div className='square mb-4 bg-danger'><p className='pl-4'>Your</p></div> 
                        </div>
                        <div className='col'>
                            <div className='toggle-content'>
                            <div className='switch-container'>
                            <label className="switch" >
                            <input id='toggle-switch' type="checkbox" onClick={() => this.handleYour()} checked={this.state.isActivatedYours}  className="default" />
                            <span className={this.state.isActivatedYours ? 'slider round default':'slider round light'}></span>
                            </label>
                            </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className='row'>
                        <div className='col'>
                            <div className='square mb-4 bg-info'><p className='pl-4'>Colleagues</p></div> 
                        </div>
                        <div className='col'>
                            <div className='toggle-content'>
                            <div className='switch-container'>
                            <label className="switch" >
                            <input id='toggle-switch' type="checkbox" onClick={() => this.handleColleagues()} checked={this.state.isActivatedColleagues} className="default" />
                            <span className={this.state.isActivatedColleagues ? 'slider round default':'slider round light'}></span>
                            </label>
                            </div>
                            </div>
                        </div>
                    </div>  

                    <div className='row'>
                        <div className='col'>
                            <div className='square mb-4 bg-warning'><p className='pl-4'>Company</p></div> 
                        </div>
                        <div className='col'>
                            <div className='toggle-content'>
                            <div className='switch-container'>
                            <label className="switch" >
                            <input id='toggle-switch' type="checkbox" onClick={() => this.handleCompany()} checked={this.state.isActivatedCompany} className="default" />
                            <span className={this.state.isActivatedCompany ? 'slider round default':'slider round light'}></span>
                            </label>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className='row mt-4'>
                    <div className='col targetedby-col'>
                            <div className='semibold'>Оценивали:</div>
                            <ul>
                            {this.state.targeted_by && this.state.targeted_by.map((item,i)=>
                            <li key={i} className='mt-4'>{item}</li>
                            )}
                            </ul>
                        </div>
                    </div>
                        </div>

                        
                    </div>
                    

                    </div>
                    <div className='col comments-col'>
                    <div className='semibold'>Комментарии:</div>
                    <ul className='mt-3'>
                        {this.state.comments && this.state.comments.map((item, i)=>
                            <div className='d-flex mt-3'><img src='../../../icons/quotes.svg'className='align-self-center' /><li key={i}>{item}</li></div>
                        )}
                    </ul>
                    </div>
                </div>
              </div>
          );
                        }
}

  export default InterviewsResults;