const React = require('react');
const ReactDOM = require('react-dom');

export class LoginForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = { user: { userName: "", userPassword: "" } };
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.name === 'isGoing' ? target.checked : target.value;
		const name = target.id;
		let usr = this.state.user;
		usr[name] = value;
		this.setState({ user: usr });
	}
	render() {
		return (
			<div className="row" >
				<br />
				<div className="col-md-4"></div>
				<div className="col-md-4">
					<h4>Login</h4>
					<form action="../idp/authorize">
						<div className="form-group">
							<label htmlFor="userName">User Name*</label>
							<input required={true} className="form-control" id="userName" name="userName" type="text" value={this.state.user.userName} onChange={this.handleInputChange}></input>
						</div>
						<div className="form-group">
							<label htmlFor="userPassword">Password*</label>
							<input required={true} className="form-control" id="userPassword" name="userPassword" type="password" value={this.state.user.userPassword} onChange={this.handleInputChange}></input>
						</div>
						<input type="submit" className="btn btn-primary" value="Submit" />
					</form>
				</div>
				<div className="col-md-4"></div>
			</div>);
	}
}