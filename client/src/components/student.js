import React from 'react';
import axios from 'axios';
import Navbar from './navbar';
import './css/student.css'

class Student extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            subjects : []
        }
        this.subjectPage = this.subjectPage.bind(this);
    }

    componentDidMount() {
        const token = localStorage.authToken;
        const name = localStorage.name;
        axios({
            url: '/subject/student',
            method: 'GET',
            headers: {Authorization: `Bearer ${token}`}
        }).then((res) => {
            this.setState({
                subjects: res.data,
                name : name
            });
        })
    }

    subjectPage(id) {
        this.props.history.push({
            pathname: `/student-lecture/${id}`,
        });
    }

    render() {
        return (
            <div className='body'>
                <div className='heading'>
                    <Navbar user='student' name={this.state.name}></Navbar>
                </div>
                
                <div className='subjects'>
                    <h3>Your Subjects</h3>
                    <div className='subject-list'>
                        {this.state.subjects.length>0 ?
                            <ul>
                                {this.state.subjects.map( subject => {
                                    return(
                                        <li onClick={()=>this.subjectPage(subject._id)}>
                                            <div className='subject inline'>{subject.name}</div>
                                            <div className='teacher inline'>{subject.teacherId.name}</div>
                                        </li>
                                    )
                                })}
                            </ul>
                        : <div className='no-list'>No Subjects Present</div> }
                    </div>
                </div>
            </div>
        )
    }
}

export default Student;