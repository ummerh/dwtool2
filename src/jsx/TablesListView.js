const React = require('react');
const ReactDOM = require('react-dom');
import {
	HashRouter as Router,
	Switch,
	Link,
	Route
} from "react-router-dom";

const TableDescriptorView = require("./TableDescriptorView.js").TableDescriptorView;

export class TablesListView extends React.Component {

	constructor(props) {
		super(props);
		this.state = { isLoaded: false, tables: [], tabl: { tableName: "" } };
		this.viewTable = this.viewTable.bind(this);
	}
	viewTable(idx) {
		var tablV = this.state.tables[idx]
		console.log(tablV);
		this.setState({ tabl: tablV }, function() {
			var myModal = new bootstrap.Modal(document.getElementById('tableDescView'), {
				keyboard: false
			})
			myModal.show();
		});
		return false;
	}
	componentDidMount() {
		const { connectionName } = this.props.match.params
		fetch("/connections/" + connectionName + "/tables")
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({
						isLoaded: true,
						tables: result
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

	render() {
		var props = this.props;
		const { connectionName } = this.props.match.params
		var viewTable = this.viewTable;
		if (this.state.isLoaded) {
			console.log(this.state.tables);
			var tablesList = this.state.tables.map(function(tabl, idx) {
				return (
					<tr key={tabl.tableName}>
					<td scope="row">{tabl.tableName}</td>
					<td>
						<button className="btn btn-sm btn-secondary" role="button" onClick={viewTable.bind(this, idx)} >View</button>
						{'\u000A'}
						<a className="btn btn-sm btn-secondary" target="_blank" role="button" href={`/connections/${connectionName}/tables/${tabl.tableName}/ddl`} >DB DDL</a>
						{'\u000A'}
						<a className="btn btn-sm btn-secondary" target="_blank" role="button" href={`/connections/${connectionName}/tables/${tabl.tableName}/hive`} >Hive DDL</a>
					</td>
				</tr>);
			}
			);
			return (
				<div><TableDescriptorView tabl={this.state.tabl} />
				<h4>Connection: {connectionName}</h4>
					<table className="table table-striped table-hover">
						<thead>
							<tr>
								<th scope="col">Table Name</th>
								<th scope="col">Action</th>
							</tr>
						</thead>
						<tbody>
							{tablesList}
						</tbody>
					</table></div>
			)
		}
		return (
			<div className="spinner-border" role="status">
				<span className="sr-only">Loading...</span>
			</div>
		);
	}
}