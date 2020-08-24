import React from 'react';
import WebcamCapture from './webcam.js';
import './css/grid.css';
import './css/studentContent.css';

function StudentContent() {
  return (
  	<section className="row">
  		<div className="youtube-video">
  			<iframe src="https://www.youtube.com/embed/OGzPmgsI-pQ" title="Insertion Sort"/>
  		</div>
  		<div className="side-box">
			<h3>Graph will appear after collecting some data</h3>
  			<WebcamCapture/>
  		</div>
  	</section>
  );
}

export default StudentContent;