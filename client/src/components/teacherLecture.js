import React from 'react';
import Navbar from './navbar';
import axios from 'axios';
import formatDate from './functions/formatDate';
import './css/teacherLecture.css'

class TeacherLecture extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            students: [],
            subjectId: ''
        }
    }

    recordPage(studentId){
        const lectureId = this.props.match.params.id;
        this.props.history.push(`/teacher-report/${lectureId}/${studentId}`);
    }

    componentDidMount() {
        const token = localStorage.authToken;
        const lectureId = this.props.match.params.id;
        axios({
            url: `/records/list/students/${lectureId}`,
            method: 'GET',
            headers: {Authorization: `Bearer ${token}`}
        }).then((res) => {
            const students = [];
            res.data.forEach(record => {
                const obj = {
                    ...record.studentId,
                    date: formatDate(record.createdAt)
                }
                students.push(obj);
            });

            this.setState({
                students: students
            });
            if(res.data.length>0){
                this.setState({subjectId: res.data[0].subjectId});
            }
        })
    }

    render() {
        return (
            <div className='body'>
                <div className='heading'>
                    <Navbar user='teacher' name={localStorage.name} id={this.state.subjectId}></Navbar>
                </div>
                <div className='students-box'>
                    <h3>Students attended the lecture</h3>
                    <div className='lecture-list'>
                        {this.state.students.length > 0 ?
                            <ul>
                                {this.state.students.map( student => {
                                    return(
                                        <li onClick={()=>this.recordPage(student._id)}>
                                            <div className='subject inline'>{student.name}</div> 
                                            <div className='teacher inline'>{student.date}</div> 
                                        </li>
                                    )
                                })}
                            </ul>
                        : <div className='no-list'>No Data Present</div>}
                    </div>
                </div>
            </div>
        )
    }
}

export default TeacherLecture;