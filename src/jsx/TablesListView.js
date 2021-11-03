const React = require('react');
const ReactDOM = require('react-dom');
import {
	HashRouter as Router,
	Switch,
	Link,
	Route
} from "react-router-dom";

const TableDescriptorView = require("./TableDescriptorView.js").TableDescriptorView;
const SqlDDLView = require("./SqlDDLView.js").SqlDDLView;
const StringListModal = require("./StringListModal.js").StringListModal;

export class TablesListView extends React.Component {

	constructor(props) {
		super(props);
		this.state = { isLoaded: false, tables: [], tabl: { tableName: "" }, ddl: "", list: [], listName: "" };
		this.viewTable = this.viewTable.bind(this);
		this.viewDDL = this.viewDDL.bind(this);
		this.viewHiveDDL = this.viewHiveDDL.bind(this);
		this.viewList = this.viewList.bind(this);
	}
	viewTable(idx) {
		var tablV = this.state.tables[idx]
		this.setState({ tabl: tablV }, function() {
			var myModal = new bootstrap.Modal(document.getElementById('tableDescView'), {
				keyboard: false
			})
			myModal.show();
		});
		return false;
	}
	viewList(idx) {
		var tablV = this.state.tables[idx];
		const { connectionName } = this.props.match.params;
		fetch("/connections/" + connectionName + "/tables/" + tablV.tableName + "/loadorder")
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({
						isLoaded: true,
						list: result
					},
						function() {
							var myModal = new bootstrap.Modal(document.getElementById('stringListModal'), {
								keyboard: false
							})
							myModal.show();
						}
					);
				},
				(error) => {
					this.setState({
						isLoaded: true,
						error
					});
				}
			)
		return;
	}
	viewDDL(idx) {
		var tablV = this.state.tables[idx];
		const { connectionName } = this.props.match.params;
		fetch("/connections/" + connectionName + "/tables/" + tablV.tableName + "/ddl")
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({
						isLoaded: true,
						ddl: result.value
					},
						function() {
							var myModal = new bootstrap.Modal(document.getElementById('ddlDescView'), {
								keyboard: false
							})
							myModal.show();
						}
					);
				},
				(error) => {
					this.setState({
						isLoaded: true,
						error
					});
				}
			)
		return;
	}
	viewHiveDDL(idx) {
		var tablV = this.state.tables[idx];
		const { connectionName } = this.props.match.params;
		fetch("/connections/" + connectionName + "/tables/" + tablV.tableName + "/hive")
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({
						isLoaded: true,
						ddl: result.value
					},
						function() {
							var myModal = new bootstrap.Modal(document.getElementById('ddlDescView'), {
								keyboard: false
							})
							myModal.show();
						}
					);
				},
				(error) => {
					this.setState({
						isLoaded: true,
						error
					});
				}
			)
		return;
	}
	componentDidMount() {
		const { connectionName } = this.props.match.params;
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
		var viewDDL = this.viewDDL;
		var viewHiveDDL = this.viewHiveDDL;
		var viewList = this.viewList;
		if (this.state.isLoaded) {
			var tablesList = this.state.tables.map(function(tabl, idx) {
				return (
					<tr key={tabl.tableName}>
						<td scope="row">{tabl.tableName}</td>
						<td>
							<button className="btn btn-sm btn-secondary" role="button" onClick={viewTable.bind(this, idx)} >View</button>
							{'\u000A'}
							<button className="btn btn-sm btn-secondary" role="button" onClick={viewList.bind(this, idx)} >Load Order</button>
							{'\u000A'}
							<button className="btn btn-sm btn-secondary" role="button" onClick={viewDDL.bind(this, idx)} >DDL</button>
							{'\u000A'}
							<button className="btn btn-sm btn-secondary" role="button" onClick={viewHiveDDL.bind(this, idx)} >Hive DDL</button>
						</td>
					</tr>);
			}
			);
			return (
				<div>
					<TableDescriptorView connectionName={connectionName} tabl={this.state.tabl} />
					<SqlDDLView connectionName={connectionName} tabl={this.state.tabl} ddl={this.state.ddl} />
					<StringListModal list={this.state.list} listName={this.state.listName} />
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