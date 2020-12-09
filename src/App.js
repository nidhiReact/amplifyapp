import React, { Component } from "react";
import Todo from "./Todo";
import "./App.css";
import { withAuthenticator } from "aws-amplify-react";
import Amplify from "aws-amplify";
import aws_exports from "./aws-exports";
import 'bootstrap/dist/css/bootstrap.min.css';
Amplify.configure(aws_exports);

class App extends Component {
  render() {
    return (
     <Todo />
    );
  }
}

export default withAuthenticator(App, true);
