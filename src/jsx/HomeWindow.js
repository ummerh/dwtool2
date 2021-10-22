const React = require('react');
const ReactDOM = require('react-dom');
export class HomeWindow extends React.Component {
	constructor(props) {
		super(props);
		this.state = { currTab: "" };
	}
	render() {
		return (
			<div>
				<main role="main">
					<section className="jumbotron text-center">
						<div className="container">
							<h1>Data Warehouse Tools</h1>
							<p className="lead">This is a non-production tool that can assist in database and schema related explorations.</p>
							<p>
								<a href="https://github.com/ummerh/azfaas-client" className="btn btn-primary" target="_blank">
									{'  '}
									<svg className="octicon octicon-mark-github v-align-middle" height="22" viewBox="0 0 16 16" version="1.1" width="22" aria-hidden="true"><path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
									{'  '}Source Code</a>

							</p>
							<p className="lead text-muted">DW Tools allows you to configure a connection to supported RDBMS systems. Once the connection is established successfully, it can assist you with the schema explorations, schema comparisons, and generate code or assist in development activities like DDL generation, DDL Diff generation and extend further to provide HDFS based equivalent scripts.</p>
						</div>
					</section>					
					<div className="container">
						<div className="row">
							<div className="col-md-4">
								<h2>Features</h2>
								<p>This is a tool box for Data engineers.</p>
								<p>Connect your RDBMS systems.</p>
								<p>Explore and compare schemas.</p>
								<p>Convert Excel sheets into SQL databases.</p>
								<p>Generate DDL & Code.</p>
							</div>
							<div className="col-md-4">
								<h2>Technologies</h2>
								<ul>
									<li>Java</li>
									<li>NodeJS</li>
									<li>ReactJS</li>
									<li>Spring Boot</li>									
									<li>Bootstrap</li>
									<li>Docker</li>
									<li>Azure App Services</li>
								</ul>
								<p><a className="btn btn-secondary" href="#" role="button">View details »</a></p>
							</div>
							<div className="col-md-4">
								<h2>Instructions</h2>
								<ul>
									<li>Setup workspace</li>
									<li>Setup Azure container registry</li>
									<li>Git clone source code</li>
									<li>mvn clean package</li>
									<li>docker build</li>
									<li>docker tag</li>
									<li>acr login</li>
									<li>Docker push to acr</li>
									<li>Deploy to Azure App Service</li>
								</ul>
								<p><a className="btn btn-secondary" href="#" role="button">View details »</a></p>
							</div>
						</div>
						<hr />
					</div>
				</main>
				<footer className="container">
					<p>Copyright 2019-2020</p>
				</footer>
			</div >
		);
	}
}