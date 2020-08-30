import React from 'react';
import Navbar from './navbar';
import axios from 'axios';
import Modal from 'react-modal';
import './css/studentLecture.css';

class StudentSubject extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            completed: [],
            incomplete: [],
            isActive: false
        }

        this.completePage = this.completePage.bind(this);
        this.incompletePage = this.incompletePage.bind(this);
        this.modalClose = this.modalClose.bind(this);
    }

    componentDidMount() {
        Modal.setAppElement('body');
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

    modalClose() {
        this.setState({
            isActive: false
        })
    }

    completePage(id){
        const path=`/student-record/${id}`;
        this.props.history.push({
            pathname: path
        });
    }

    incompletePage(id){
        const subjectId = this.props.match.params.id;
        const lectureId = id;
        const currLecture = this.state.incomplete.find(lecture => lecture._id===id);
        this.setState({isActive: true});
        navigator.mediaDevices.getUserMedia({
            video: true, 
            audio: false
        }).then((obj) =>{
            this.props.history.push({
                pathname: '/live-classroom',
                state: {
                    subjectId,
                    lectureId,
                    videoId: currLecture.videoId
                }
            });
        }).catch(err=>console.log('ERROR: ',err));
    }

    render(){
        return (
            <div className='body'>
                <div className='heading'>
                    <Navbar user='student' name={this.state.name}></Navbar>
                </div>
                <Modal isOpen={this.state.isActive} onRequestClose={this.modalClose} className='modal-view'>
                    <div className='modal-text'>Allow camera access to the website</div>
                </Modal>
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