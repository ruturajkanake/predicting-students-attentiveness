import React from 'react';
import StudentContent from './studentContent';
import StudentReport from './studentReport';
import { BrowserRouter, Route, Switch} from "react-router-dom";

function App() {
  return (
  	<div>
		<BrowserRouter>
			<Switch>
				<Route path='/report' component={StudentReport}></Route>
				<Route path='/' component={StudentContent}></Route>
			</Switch>
		</BrowserRouter>
  	</div>
  );
}

export default App;
