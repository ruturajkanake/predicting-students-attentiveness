import './css/webcam.css';
import React from "react";
import Webcam from "react-webcam";
import faceApi from './functions/faceApi';
import ViewChart from './showChart';
import { calculateAttention } from './functions/calAttentiveness';
import { withRouter } from 'react-router';

class WebcamCapture extends React.Component{ 

	constructor(props){
		super(props);
		this.timerID = null;
		this.webcamRef = null;
		this.state = {
			time: 0,
			Ydata: 0,
			completeXArray: [],
			completeYArray: [],
			XArray: [],
			YArray: [],
			Yavg: 0,
			Yvar: 0
		};
		this.getFaceDetails = this.getFaceDetails.bind(this);		
		this.handleChange = this.handleChange.bind(this);
		this.setPointsData = this.setPointsData.bind(this);				
	
	}

	componentDidMount() {
		this.timerID = setInterval(() => {
			this.getFaceDetails();
		}, 3000);
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	setPointsData() {

		let Xdata = this.state.time,
			Ydata = this.state.Ydata,
			completeXArray = this.state.completeXArray,
			completeYArray = this.state.completeYArray,
			XArray = this.state.XArray,
			YArray = this.state.YArray,
			Yavg = this.state.Yavg,
			Yvar = this.state.Yvar
		
		if(Ydata !== null){

			if (Ydata > 50) Ydata = 50;

			XArray.push(Xdata);
			completeXArray.push(Xdata);
			
			completeYArray.push(Ydata);

			if (completeYArray.length >= 3) {
				Yavg = completeYArray.slice(-3).reduce(function(a, b) {
					return a + b;
				}) / 3.0; // takes average of last three elements

				Yvar = Math.abs((Yavg - Ydata));
				YArray.push(Yvar);
			} else {
				XArray.shift(); // remove that data from it
			}
			
			if (XArray.length > 10 ) {
				XArray.shift(); // remove first entry
				YArray.shift();
			}

			this.setState({
				completeXArray,
				completeYArray,
				XArray,
				YArray,
				Yavg,
				Yvar,
				time: this.state.time + 3
			}, () => {
				console.log('X: ', this.state.XArray);
				console.log('Y: ', this.state.YArray);
				console.log('Complete Y', this.state.completeYArray);
			});
		}
	}

	handleChange(){
		clearInterval(this.timerID);
		this.props.history.push({
			pathname: '/report',
			state: { 
				x: this.state.completeXArray,
				y: this.state.completeYArray,
				subjectId: this.props.subjectId,
				lectureId: this.props.lectureId
			}
		})
	}

	async getFaceDetails (){

		const imageSrc = this.webcamRef.getScreenshot();
		try{
			const obj = await faceApi(imageSrc); 
			const attention = calculateAttention(obj);
			this.setState({
				Ydata: attention
			}, () => {
				this.setPointsData();
			});
		}catch(error){
			console.log(error);
		}
	}


	render() {
		return (
			<>
				<ViewChart x={this.state.XArray} y={this.state.YArray} live={true}/>
				<div className="webcam-video">
					<Webcam
						audio={false}
						ref={webcamRef => {this.webcamRef = webcamRef}}
						screenshotFormat="image/png"
						forceScreenshotSourceSize="true"
					/>
				</div>
				<button className="btn" onClick={this.handleChange}>Click Here to Stop Observation</button>
			</>
		);
	}
};

export default withRouter(WebcamCapture);