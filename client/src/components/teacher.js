import React from 'react';
import Navbar from './navbar';
import axios from 'axios';
import './css/teacher.css';

class Teacher extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            subjects : [],
            name : ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.subjectPage = this.subjectPage.bind(this);
        this.resetUserInputs = this.resetUserInputs.bind(this);
    }

    componentDidMount() {
        const token = localStorage.authToken;
        axios({
            url: '/subject/teacher',
            method: 'GET',
            headers: {Authorization: `Bearer ${token}`}
        }).then((res) => {
            this.setState({
                subjects: res.data
            });
        })
    }

    handleSubmit() {
        const token = localStorage.authToken;
        const payload = {name: this.state.name};
        axios({
            url: '/subject/create',
            method: 'POST',
            data: payload,
            headers: {Authorization: `Bearer ${token}`}
        }).then((res) => {
            this.setState({
                subjects: res.data
            });
            this.resetUserInputs();
        }).catch((err)=>{
            console.log(err);
        })
    }

    subjectPage(id){
        this.props.history.push({
            pathname: '/teacher-subject',
            data: {
                id: id
            }
        });
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    resetUserInputs(){
        this.setState({name: ''});
    }
    
    render() {
        return (
            <div className='body'>
                <div className='heading'>
                    <Navbar user='teacher' name={localStorage.name}></Navbar>
                </div>
                
                <div className='main-body'>
                    <div className='box-left'>
                        <h3>Your Subjects</h3>
                        <div className='subject-list'>
                            <ul>
                                {this.state.subjects.map( subject => {
                                    return(
                                        <li onClick={()=>this.subjectPage(subject._id)}>
                                            <div className='subject inline'>{subject.name}</div> 
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className='box-right'>
                        <h3>Add New Subject</h3>
                        <form onSubmit={this.handleSubmit} className='form-subject'>
                            <label for='name'>Subject Name</label>
                            <input 
                                type='text'
                                placeholder='Eg: History'
                                name='name'
                                value={this.state.name}
                                id='name'
                                onChange={this.handleChange}
                                required
                            />
                            <input type='submit' value='Add Subject'></input>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Teacher;