const React = require('react');
const ReactDOM = require('react-dom');
import {
	HashRouter as Router,
	Switch,
	Link,
	Route
} from "react-router-dom";


export class TableDescriptorView extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		var colsList = null;
		if (this.props.tabl.columns) {
			colsList = this.props.tabl.columns.map(function(col, idx) {
				return (<tr key={col.name}>
					<td scope="row">{col.name}</td>
					<td scope="row">{col.typeName}</td>
					<td scope="row">{col.size}</td>
					<td scope="row">{col.nullable ? "true":""}</td>
					<td scope="row">{col.decimalDigits}</td>
				</tr>);
			}
			);
		}

		return (
			<div className="modal fade" id="tableDescView" tabIndex="-1" aria-labelledby="tableDescView" aria-hidden={true}>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="tableDescView">Table - {this.props.tabl.tableName}</h5>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<table className="table table-striped table-hover">
								<thead>
									<tr>
										<th scope="col">Name</th>
										<th scope="col">Type</th>
										<th scope="col">Size</th>
										<th scope="col">Nullable</th>
										<th scope="col">Precision</th>
									</tr>
								</thead>
								<tbody>
									{colsList}
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