import React from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { Layout } from '../layout/Layout';
import { Home } from '../pages/Home';
import { NotFound } from '../pages/NotFound';


const AppRouter = () => {

	const history = useHistory()
	return (
		<Switch>
			<Route path='/' exact component={() => <Home />} />
			<Route path="/on-sign-in" component={() => { history.goBack(); return null }} />
			{/* <Route path="/on-sign-in" component={() => { props.history.goBack(); return null }} /> */}
			<Route path="/terms-of-service" component={() => <div>we own you</div>} />
			<Route path="/privacy-policy" component={() => <div>we sell it</div>} />
			<Route component={() => <NotFound />} />
		</Switch>
	)
}

export default AppRouter