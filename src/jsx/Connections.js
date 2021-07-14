const React = require('react');
const ReactDOM = require('react-dom');
import {
	HashRouter as Router,
	Switch,
	Link,
	Route
} from "react-router-dom";

export class Connections extends React.Component {

	constructor(props) {
		super(props);
		this.state = { connections: [], status: "", req: { connectionName: "", driver: "", connectionString: "", schema: "", userName: "", userPassword: "", valid: false }, isLoaded: false };
		this.handleInputChange = this.handleInputChange.bind(this);
		this.submitChange = this.submitChange.bind(this);
	}

	componentDidMount() {
		fetch("/connections")
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({
						isLoaded: true,
						connections: result
					});
					console.log(result)
				},
				(error) => {
					this.setState({
						isLoaded: true,
						error
					});
				}
			)
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.name === 'isGoing' ? target.checked : target.value;
		const name = target.id;
		let newReq = this.state.req;
		newReq[name] = value;
		this.setState({
			req: newReq
		});
	}
	submitChange(event) {
		this.setState({
			status: "Saving & testing the connection...",
		});
		fetch("/newConnection", {
			method: 'POST', body: JSON.stringify(this.state.req), headers: {
				'Content-Type': 'application/json'
			},
		})
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({
						isLoaded: true,
						status: result.valid ? "Saved successfully." : "Connection test failed",
						req: result
					});
				},
				(error) => {
					this.setState({
						isLoaded: true,
						status: "Save failed.",
						error
					});
				}
			)
	}
	render() {
		if (this.state.isLoaded) {
			var connections = this.state.connections.map(function(conn) {
				return (<tr key={conn.name}>
					<td scope="row">{conn.name}</td>
					<td scope="row">{conn.url}</td>
					<td scope="row">{conn.schema}</td>
					<td scope="row">{conn.user}</td>
					<td scope="row"><button type="button" className="btn btn-sm btn-secondary">test</button> <button type="button" className="btn btn-sm btn-secondary">edit</button> <button type="button" className="btn btn-sm btn-secondary">delete</button></td>
				</tr>);
			}
			);

			let newConnModal = (
				<div className="modal fade" id="newConnModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden={true}>
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="newConnModalLabel">New Connection</h5>
								<p>{this.status}</p>
								<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
							</div>
							<div className="modal-body">
								<form>
									<div className="mb-3">
										<label htmlFor="connectionName" className="form-label">Connection Name</label>
										<input type="text" className="form-control" id="connectionName" aria-describedby="connectionNameHelp" value={this.state.req.connectionName} onChange={this.handleInputChange} />
									</div>
									<div className="mb-3">
										<label htmlFor="connectionString" className="form-label">Connection String</label>
										<input type="text" className="form-control" id="connectionString" aria-describedby="connectionStringHelp" value={this.state.req.connectionString} onChange={this.handleInputChange} />
										<div id="connectionStringHelp" className="form-text">jdbc:mysql://eacloud-mysqlserver.mysql.database.azure.com:3306/eforms?useSSL=true</div>
									</div>
									<div className="mb-3">
										<label htmlFor="schema" className="form-label">Schema</label>
										<input type="text" className="form-control" id="schema" aria-describedby="schemaHelp" value={this.state.req.schema} onChange={this.handleInputChange} />
									</div>
									<div className="mb-3">
										<label htmlFor="userName" className="form-label">User</label>
										<input type="text" className="form-control" id="userName" aria-describedby="userNameHelp" value={this.state.req.userName} onChange={this.handleInputChange} />
									</div>
									<div className="mb-3">
										<label htmlFor="userPassword" className="form-label">Password</label>
										<input type="password" className="form-control" id="userPassword" value={this.state.req.userPassword} onChange={this.handleInputChange} />
									</div>
								</form>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-primary" onClick={this.submitChange} disabled={this.state.req.valid}>Save</button>
								<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
							</div>
						</div>
					</div>
				</div>
			);
			return (<div>
				<div className="row" ><div className="col-lg-12">
					<h4>Database Connections</h4>
					{newConnModal}
					<button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#newConnModal" >
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
							<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
							<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
						</svg> Add
				</button></div></div>
				<br />
				<div className="row" ><div className="col-lg-12"><table className="table">
					<thead>
						<tr>
							<th scope="col">Name</th>
							<th scope="col">URL</th>
							<th scope="col">Schema</th>
							<th scope="col">User</th>
							<th scope="col">Actions</th>
						</tr>
					</thead>
					<tbody>
						{connections}
					</tbody>
				</table></div></div></div>);
		}
		return (
			<div className="spinner-border" role="status">
				<span className="sr-only">Loading...</span>
			</div>
		);
	}
}