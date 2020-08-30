import Navbar from './navbar';
import axios from 'axios';
const React = require('react');
const math = require('mathjs');
const ViewChart = require('./showChart').default;
require('./css/studentReport.css');

class StudentReport extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            xArray: [0, 3, 6],
            yArray: [1,2,3]
        }
    }

    componentDidMount() {
        // window.scrollTo(0,0);
        let resultsYArray = [],
            resultsXArray = [],
            Yavg = 0,
            Yvar = 0;

        const completeXArray = this.props.location.state.x;
        const completeYArray = this.props.location.state.y;

        for (let i = 3; i < completeYArray.length; i++) {
            resultsXArray.push(completeXArray[i]);

            let sum = completeYArray[i] + completeYArray[i - 1] + completeYArray[i - 2];
            Yavg = sum / 3.0; // takes average of last three elements

            Yvar = Math.abs((Yavg - completeYArray[i])).toFixed(2);
            resultsYArray.push(Yvar);
        }
        this.setState({
            xArray: resultsXArray,
            yArray: resultsYArray
        });
        const token = localStorage.authToken;
        const subjectId = this.props.location.state.subjectId;
        const lectureId = this.props.location.state.lectureId;
        const payload = {
            xData: resultsXArray,
            yData: resultsYArray
        }
        axios({
            url: `/records/create/${lectureId}/${subjectId}`,
            method: 'POST',
            data: payload,
            headers: {Authorization: `Bearer ${token}`}
        }).then().catch(err=> console.log(err));
    }

    render() {
        const subjectId = this.props.location.state.subjectId;
        return (
            <div className="body">
                <div className="heading">
                    <Navbar user="student" name={localStorage.name} id={subjectId}></Navbar>
                </div>
                <ViewChart x={this.state.xArray} y={this.state.yArray} live={false}/>
                <div className="other-details">
                    <h4>Mean : {math.mean(this.state.yArray).toFixed(2)}</h4>
                    <h4>Median : {math.median(this.state.yArray).toFixed(2)}</h4>
                    <h4>Standard Deviation : {math.std(this.state.yArray).toFixed(2)}</h4>
                </div>
            </div>
        )
    }
}

export default StudentReport;