const React = require('react');
const ReactDOM = require('react-dom');
export class Navigation extends React.Component {
	constructor(props) {
		super(props);
		this.state = { currTab: "" };
	}
	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<a className="navbar-brand" href="/">DW Tools</a>
				<button className="navbar-toggler" type="button" data-toggle="collapse"
					data-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent" aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item"><a className="nav-link" href={this.props.path + "/#/connections"}>Connections</a></li>
						<li className="nav-item"><a className="nav-link" href={this.props.path + "/#/images/jackson"}>Excel DB</a></li>
						<li className="nav-item"><a className="nav-link disabled" href="#"
							aria-disabled="true">Code Assists</a></li>
					</ul>
					<ul className="navbar-nav navbar-right">
						<li className="nav-item nav-link">{givenName ? givenName : ''}</li>
						<li className="nav-item"><a className="nav-link disabled" href="#"
							aria-disabled="true">v0.0.1</a></li>
					</ul>
				</div>
			</nav>);
	}
}