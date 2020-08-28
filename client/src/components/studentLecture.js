import React from 'react';
import Navbar from './navbar';
import axios from 'axios';
import './css/studentLecture.css';
import './css/student.css';

class StudentSubject extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            completed: [],
            incomplete: []
        }

        this.completePage = this.completePage.bind(this);
        this.incompletePage = this.incompletePage.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        const token = localStorage.authToken;
        const name = localStorage.name
        axios({
            method: 'GET',
            url: `/lecture/student/${id}`,
            headers: {Authorization: `Bearer ${token}`}
        }).then((res) => {
            this.setState({
                name: name,
                completed: res.data.complete,
                incomplete: res.data.incomplete
            });
        }).catch((error) =>{
            console.log('ERROR: ', error);
        })
    }

    completePage(id){
        const path=`/student-record/${id}`;
        this.props.history.push({
            pathname: path
        });
    }

    incompletePage(id){
        navigator.mediaDevices.getUserMedia({
            video: true, 
            audio: false
        }).then((obj) =>{
            console.log(obj);
        })
    }

    render(){
        return (
            <div className='body'>
                <div className='heading'>
                    <Navbar user='student' name={this.state.name}></Navbar>
                </div>
                <div className='student-lecture'>
                    <div className='incomplete'>
                        <h3>Incomplete Lectures</h3>
                        {this.state.incomplete.length>0 ? 
                            <ul>
                                {this.state.incomplete.map( lecture => {
                                    return(
                                        <li onClick={()=>this.incompletePage(lecture._id)}>
                                            <div className='lecture'>{lecture.topic}</div>
                                        </li>
                                    )
                                })}
                            </ul>
                        : <div className='no-list'>No Data Present</div> }
                    </div>
                    <div className='complete'>
                        <h3>Lectures Completed</h3>
                        {this.state.completed.length>0 ?
                            <ul>
                                {this.state.completed.map( lecture => {
                                    return (
                                        <li onClick={()=>this.completePage(lecture._id)}>
                                            <div className='lecture inline'>{lecture.topic}</div>
                                        </li>
                                    )
                                })}
                            </ul>
                        : <div className='no-list'>No Data Present</div> }
                    </div>
                </div>
            </div>
        )
    }
}

export default StudentSubject;