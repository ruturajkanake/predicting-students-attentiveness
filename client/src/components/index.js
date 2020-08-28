import React from 'react';
import Login from './login';
import Teacher from './teacher';
import Student from './student';
import StudentSubject from './studentLecture';
import TeacherSubject from './teacherLecture';
import StudentContent from './studentContent';
import StudentReport from './studentReport';
import StudentRecord from './studentRecord';
import { BrowserRouter, Route, Switch} from "react-router-dom";

function App() {
  return (
  	<div>
		<BrowserRouter>
			<Switch>
				<Route exact path='/' component={Login}></Route>
				<Route exact path='/student' component={Student}></Route>
				<Route exact path='/student-lecture/:id' component={StudentSubject}/>
				<Route exact path='/teacher-lecture/:id' component={TeacherSubject}/>
				<Route exact path='/student-record/:id' component={StudentRecord}/>
				<Route exact path='/teacher' component={Teacher}></Route>
				<Route exact path='/report' component={StudentReport}></Route>
				<Route exact path='/live-classroom' component={StudentContent}></Route>
			</Switch>
		</BrowserRouter>
  	</div>
  );
}

export default App;
