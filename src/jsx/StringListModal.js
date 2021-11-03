const React = require('react');
const ReactDOM = require('react-dom');
import {
	HashRouter as Router,
	Switch,
	Link,
	Route
} from "react-router-dom";


export class StringListModal extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		var listView = this.props.list.map(function(val, idx) {
			return (
				<tr key={val}>
					<td scope="row">{val}</td>
				</tr>);
		}
		);

		return (
			<div className="modal fade" id="stringListModal" tabIndex="-1" aria-labelledby="stringListModal" aria-hidden={true}>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="stringListModal">{this.props.listName}</h5>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<table className="table table-striped table-hover">
								<thead>
									<tr>
										<th scope="col">Value</th>
									</tr>
								</thead>
								<tbody>
									{listView}
								</tbody>
							</table>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}