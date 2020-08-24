const React = require('react');
const math = require('mathjs');
const ViewChart = require('./showChart').default;
require('./css/studentReport.css');

class StudentReport extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            xArray: [],
            yArray: []
        }
    }

    async componentWillMount() {
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
        console.log(resultsXArray);
        console.log(resultsYArray);
        await this.setState({
            xArray: resultsXArray,
            yArray: resultsYArray
        });
    }

    render() {
        return (
            <>
                <ViewChart x={this.state.xArray} y={this.state.yArray} live={false}/>
                <div className="other-details">
                    <h4>Mean : {math.mean(this.state.yArray).toFixed(2)}</h4>
                    <h4>Median : {math.median(this.state.yArray).toFixed(2)}</h4>
                    <h4>Standard Deviation : {math.std(this.state.yArray).toFixed(2)}</h4>
                </div>
            </>
        )
    }
}

export default StudentReport;