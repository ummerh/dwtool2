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
		this.state = { connections: [], status: "", req: { name: "", driver: "", url: "", schema: "", userId: "", password: "", valid: false }, saved: false, isLoaded: false };
		this.handleInputChange = this.handleInputChange.bind(this);
		this.submitChange = this.submitChange.bind(this);
		this.updateConnection = this.updateConnection.bind(this);
		this.deleteConnection = this.deleteConnection.bind(this);
		this.resetModal = this.resetModal.bind(this);
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
				},
				(error) => {
					this.setState({
						isLoaded: true,
						error
					});
				}
			)
	}
	resetModal(event) {
		var myModal = new bootstrap.Modal(document.getElementById('newConnModal'), {
			keyboard: false
		})
		this.setState({ req: { name: "", driver: "", url: "", schema: "", userId: "", password: "", valid: false }, saved: false });
		myModal.show();
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.name === 'isGoing' ? target.checked : target.value;
		const name = target.id;
		let newReq = this.state.req;
		newReq[name] = value;
		this.setState({
			req: newReq,
			saved: false
		});
	}
	submitChange(event) {
		this.setState({
			status: "Saving & testing the connection...",
		});

		var connections = this.state.connections;
		var newConn = this.state.req;
		var match = connections.filter(function(value, index) {
			return newConn.name == value.name;
		});
		var newConns = this.state.connections;
		if (match.length == 0) {
			newConns.push(this.state.req);
		}
		fetch("/connections", {
			method: 'POST', body: JSON.stringify(this.state.req), headers: {
				'Content-Type': 'application/json'
			},
		})
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({
						saved: true,
						status: result.valid ? "Saved successfully." : "Connection settings are not valid, please edit and re-submit.",
						req: result,
						connections: newConns
					});
				},
				(error) => {
					this.setState({
						saved: false,
						status: "Save failed.",
						error
					});
				}
			)
	}
	updateConnection(idx, event) {
		var newReq = this.state.connections[idx]
		this.setState({
			req: newReq,
			saved: false
		});
		var myModal = new bootstrap.Modal(document.getElementById('newConnModal'), {
			keyboard: false
		})
		myModal.show();
	}	
	deleteConnection(idx, event) {
		var cfm = confirm('Are you sure you want to delete the connection? It cannot be restored. Click OK to delete.');
		if (cfm) {
			var connections = this.state.connections;
			var req = this.state.connections[idx]
			var filtered = connections.filter(function(value, index) {
				return index != idx;
			});
			fetch("/connections", {
				method: 'DELETE', body: JSON.stringify(req), headers: {
					'Content-Type': 'application/json'
				},
			})
			this.setState({
				saved: true,
				status: "Deleted",
				connections: filtered
			});
		}
	}
	render() {
		var updateConnection = this.updateConnection;
		var deleteConnection = this.deleteConnection;
		if (this.state.isLoaded) {
			var connections = this.state.connections.map(function(conn, idx) {
				var viewTables = <Link className="btn btn-sm btn-secondary" role="button" to={`/connections/view/${conn.name}`}>View Tables</Link>
				return (<tr key={conn.name}>
					<td scope="row">{conn.name}</td>
					<td scope="row">{conn.url}</td>
					<td scope="row">{conn.schema}</td>
					<td scope="row">{conn.userId}</td>
					<td scope="row">
					{viewTables}
					{'\u000A'}
					<button type="button" className="btn btn-sm btn-secondary" onClick={updateConnection.bind(this, idx)}>edit</button>
					{'\u000A'} 
					<button type="button" className="btn btn-sm btn-secondary" onClick={deleteConnection.bind(this, idx)} >delete</button></td>
				</tr>);
			}
			);

			let newConnModal = (
				<div className="modal fade" id="newConnModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden={true}>
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="newConnModalLabel">New Connection</h5>
								<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
							</div>
							<div className="modal-body">
								<form>
									<div className="mb-3">
										<label htmlFor="name" className="form-label">Connection Name</label>
										<input type="text" className="form-control" id="name" aria-describedby="nameHelp" value={this.state.req.name} onChange={this.handleInputChange} disabled={this.state.saved} />
									</div>
									<div className="mb-3">
										<label htmlFor="url" className="form-label">Connection String</label>
										<input type="text" className="form-control" id="url" aria-describedby="urlHelp" value={this.state.req.url} onChange={this.handleInputChange} />
										<div id="urlHelp" className="form-text">jdbc:mysql://localhost:3306/edp_config</div>
									</div>
									<div className="mb-3">
										<label htmlFor="schema" className="form-label">Schema</label>
										<input type="text" className="form-control" id="schema" aria-describedby="schemaHelp" value={this.state.req.schema} onChange={this.handleInputChange} />
									</div>
									<div className="mb-3">
										<label htmlFor="userId" className="form-label">User</label>
										<input type="text" className="form-control" id="userId" aria-describedby="userIdHelp" value={this.state.req.userId} onChange={this.handleInputChange} />
									</div>
									<div className="mb-3">
										<label htmlFor="password" className="form-label">Password</label>
										<input type="password" className="form-control" id="password" value={this.state.req.password} onChange={this.handleInputChange} />
									</div>
								</form>
							</div>
							<div className="modal-footer">
								{this.state.status}
								<button type="button" className="btn btn-primary" onClick={this.submitChange} disabled={this.state.saved}>Save</button>
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
					<button type="button" className="btn btn-secondary" onClick={this.resetModal} >
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