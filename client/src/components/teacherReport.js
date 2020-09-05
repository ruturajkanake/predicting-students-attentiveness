import React from 'react';
import Navbar from './navbar';
import axios from 'axios';
import ViewChart from './showChart';
const math = require('mathjs');

class TeacherReport extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            xArray: [0],
            yArray: [0],
            subjectId: ''
        }
    }

    componentDidMount() {
        const token = localStorage.authToken;
        const studentId = this.props.match.params.studentId;
        const lectureId = this.props.match.params.lectureId;

        axios({
            url: `/records/teacher/${lectureId}/${studentId}`,
            method: 'GET',
            headers: {Authorization: `Bearer ${token}`}
        }).then((res) => {
            this.setState({
                xArray: res.data.recordX,
                yArray: res.data.recordY,
                subjectId: res.data.subjectId
            });
        })
    }

    render() {
        return (
            <div className='body'>
                <div className='heading'>
                    <Navbar user='teacher' name={localStorage.name} id={this.state.subjectId}></Navbar>
                </div>
                <ViewChart x={this.state.xArray} y={this.state.yArray} live={false} />
                <div className="other-details">
                    <h4>Mean : {math.mean(this.state.yArray).toFixed(2)}</h4>
                    <h4>Median : {math.median(this.state.yArray).toFixed(2)}</h4>
                    <h4>Standard Deviation : {math.std(this.state.yArray).toFixed(2)}</h4>
                </div>
            </div>
        )
    }
}

export default TeacherReport;