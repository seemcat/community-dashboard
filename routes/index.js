import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import CommunityDashboard from './communityDashboard'

class AppRouter extends React.Component {
	render() {
		return (
			<Router>
			<Switch>
			<Route exact path='/' component={CommunityDashboard} />
			</Switch>
			</Router>
		)
	}
}

export default AppRouter;
