const React = require('react');
const ReactDOM = require('react-dom');
const Home = require("./Home.js").Home;
if (document.getElementById("homeContent")) {
	ReactDOM.render(<Home />, document.getElementById("homeContent"));
}