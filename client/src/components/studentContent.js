import React from 'react';
import WebcamCapture from './webcam.js';
import './css/studentContent.css';

function StudentContent(props) {
	const videoId = props.location.state.videoId ? props.location.state.videoId : 'pcKY4hjDrxk'
	const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  	return (
		<section className="row">
			<div className="youtube-video">
				<iframe src={videoUrl} title="Insertion Sort"/>
			</div>
			<div className="side-box">
				<h3>Graph will appear after collecting some data</h3>
				<WebcamCapture 
					subjectId={props.location.state.subjectId} 
					lectureId={props.location.state.lectureId}
				/>
			</div>
		</section>
 	);
}

export default StudentContent;