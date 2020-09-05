import React from 'react';
import axios from 'axios';
import Navbar from './navbar';
import './css/teacherSubject.css';

class TeacherSubject extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            students: [],
            lectures: [],
            topic: '',
            description: '',
            url: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.lecturePage = this.lecturePage.bind(this);
        this.resetUserInputs = this.resetUserInputs.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        const subjectId = this.props.match.params.id;
        const token = localStorage.authToken;
        const payload = {
            topic: this.state.topic,
            description: this.state.description,
            url: this.state.url
        }

        axios({
            url: `/lecture/create/${subjectId}`,
            method: 'POST',
            data: payload,
            headers: {Authorization: `Bearer ${token}`}
        }).then((res) => {
            this.setState({
                lectures: res.data
            });
            this.resetUserInputs();
        }).catch( err=> console.log(err));
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    lecturePage(id){
        this.props.history.push(`/teacher-record/${id}`);
    }

    resetUserInputs() {
        this.setState({
            topic: '',
            description: '',
            url: ''
        })
    }

    componentDidMount() {
        const token = localStorage.authToken;
        const subjectId = this.props.match.params.id;
        axios({
            url: `/subject/teacher/${subjectId}`,
            method: 'GET',
            headers: {Authorization: `Bearer ${token}`}
        }).then((res) => {
            this.setState({
                students: res.data.students
            })
        }).catch(err => console.log(err));

        axios({
            url: `/lecture/teacher/${subjectId}`,
            method: 'GET',
            headers: {Authorization: `Bearer ${token}`}
        }).then((res) => {
            this.setState({
                lectures: res.data
            })
        }).catch(err => console.log(err));
    }

    render(){
        return (
            <div className='body'>
               <div className='heading teacher-heading'>
                    <Navbar user='teacher' name={localStorage.name}></Navbar>
                </div>
                <div className='main-body teacher-heading'>
                    <div className='left-box'>
                        <h3>Students</h3>
                        <div className='student-list'>
                            {this.state.students.length>0 ?
                            <ul>
                                {
                                    this.state.students.map(student => {
                                        return <li>{student.name}</li>
                                    })
                                }
                            </ul>
                            : <div className='no-list'>No Data Present</div>}
                        </div>
                    </div>
                    <div className='center-box'>
                        <h3>Lectures List</h3>
                        <div className='lectures-list'>
                            {this.state.lectures.length>0 ?
                            <ul>
                                {
                                    this.state.lectures.map(lecture => {
                                    return (<li onClick={()=>this.lecturePage(lecture._id)}>
                                        <div className='lecture'>{lecture.topic}</div> 
                                    </li>)
                                    })
                                }
                            </ul>
                            : <div className='no-list'>No Data Present</div>}
                        </div>
                    </div>
                    <div className='right-box'>
                        <h3>Create Lecture</h3>
                        <form onSubmit={this.handleSubmit} className='lecture-form'>
                            <label for='topic'>Topic</label>
                            <input 
                                type='text'
                                placeholder='Eg. Renewable Energy'
                                name='topic'
                                value={this.state.topic}
                                onChange={this.handleChange}
                                required
                            /><br/>
                            <label for='description'>Description</label><br/>
                            <textarea
                                name='description'
                                value={this.state.description}
                                onChange={this.handleChange}
                            ></textarea><br/>
                            <label for='url'>Public Video URL</label><br/>
                            <input
                                type='text'
                                name='url'
                                placeholder='www.youtube.com/watch?v=coYp_HJGRS0'
                                value={this.state.url}
                                onChange={this.handleChange}
                                required
                            />
                            <input type='submit' value='Add Lecture'/>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default TeacherSubject;