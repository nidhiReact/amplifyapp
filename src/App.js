import React, { Component } from "react";
import Todo from "./Todo";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
class App extends Component {
  state = {
    user: null,
  };
  signIn(username, password) {
    this.setState({
      user: {
        username,
        password,
      },
    });
  }

  signOut() {
    this.setState({ user: null });
  }

  render() {
    return (
      <div className="container">
        {this.state.user ? (
          <Welcome user={this.state.user} onSignOut={this.signOut.bind(this)} />
        ) : (
          <div style={{ margin: "9%" }}>
            <LoginForm onSignIn={this.signIn.bind(this)} />
          </div>
        )}
      </div>
    );
  }
}

export default App;

const Welcome = ({ user, onSignOut }) => {
  return <Todo username={user.username} logoutFunc={onSignOut} />;
};
class LoginForm extends React.Component {
  handleSignIn(e) {
    e.preventDefault();

    if (
      this.refs.username.value === "Nidhi0695" &&
      this.refs.password.value === "Cloudcomputing"
    ) {
      let username = this.refs.username.value;
      let password = this.refs.password.value;
      this.props.onSignIn(username, password);
    } else {
      alert("User Name and password is wrong");
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSignIn.bind(this)} className="formLogin">
        <h3 style={{ textAlign: "center" }}>Sign in</h3>
        <div>Username</div>
        <input
          className="text_box"
          type="text"
          ref="username"
          placeholder="Enter you username"
        />
        <div>Passworddd</div>

        <input
          className="text_box"
          type="password"
          ref="password"
          placeholder="Enter password"
        />
        <input className="submitLogin" type="submit" value="Login" />
      </form>
    );
  }
}
