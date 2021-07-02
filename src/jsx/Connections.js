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
		this.state = { status: "OK", connection: { user: "", password: "", url: "" }, isLoaded: true };
		this.handleInputChange = this.handleInputChange.bind(this);
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
	render() {
		if (this.state.isLoaded) {
			return (<div><div className="row" ><div className="col-lg-12">Button</div></div>
				<div className="row" ><br /> <div className="col-lg-12"><table className="table">
					<thead>
						<tr>
							<th scope="col">#</th>
							<th scope="col">Name</th>
							<th scope="col">URL</th>
							<th scope="col">User</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th scope="row">1</th>
							<td>Mark</td>
							<td>Otto</td>
							<td>@mdo</td>
						</tr>
						<tr>
							<th scope="row">2</th>
							<td>Jacob</td>
							<td>Thornton</td>
							<td>@fat</td>
						</tr>
						<tr>
							<th scope="row">3</th>
							<td colspan="2">Larry the Bird</td>
							<td>@twitter</td>
						</tr>
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