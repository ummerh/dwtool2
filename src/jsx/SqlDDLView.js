const React = require('react');
const ReactDOM = require('react-dom');
import {
	HashRouter as Router,
	Switch,
	Link,
	Route
} from "react-router-dom";


export class SqlDDLView extends React.Component {
	constructor(props) {
		super(props);
	}	
	render() {
		return (
			<div className="modal fade" id="ddlDescView" tabIndex="-1" aria-labelledby="ddlDescView" aria-hidden={true}>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="ddlDescView">Definition</h5>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<pre>{this.props.ddl}</pre>
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