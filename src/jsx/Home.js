const React = require('react');
const ReactDOM = require('react-dom');
const HomeWindow = require("./HomeWindow.js").HomeWindow;
const Navigation = require("./Navigation.js").Navigation;
const Connections = require("./Connections.js").Connections;
const JacksonGallery = require("./JacksonGallery.js").JacksonGallery;
const LoginForm = require("./LoginForm.js").LoginForm;

import {
	HashRouter as Router,
	Switch,
	Route
} from "react-router-dom";

export class Home extends React.Component {
	render() {
		return (
			<Router>
				<div>
					<Navigation path="." />
					<Switch>
						<Route path="/" exact>
							<HomeWindow />
						</Route>
						<Route path="/connections" exact>
							<Connections />
						</Route>
						<Route path="/images/jackson" exact>
							<JacksonGallery />
						</Route>
						<Route path="/user/login" exact>
							<LoginForm />
						</Route>						
					</Switch>
				</div>
			</Router>
		);
	}
}