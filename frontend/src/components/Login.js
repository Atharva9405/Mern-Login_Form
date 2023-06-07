import React from "react";
import "./login.css";
import Header from "./header";
import "font-awesome/css/font-awesome.min.css";
import swal from "sweetalert/dist/sweetalert.min.js";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

class Login extends React.Component {
  constructor(props) {
    super();
    this.state = {
      username: "",
      password: "",
      message: "",
      textStyle: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      message: "",
    });
  };

  handleSubmit = (e, history) => {
    e.preventDefault();

    if (this.state.username === "") {
      alert("you need to enter the username");
    }
    if (this.state.password === "") {
      alert("you need to enter the password");
    }

    let reqBody = {
      username: this.state.username,
      password: this.state.password,
    };
    fetch("http://localhost:4444/api/user/login", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        swal(this.state.username, "logged in successfully", "success");

        if (history) {
          history.push("./update");
        }
        /*swal({
           title:"successfully login",
           text:"",
           icon:"success",
           button:"ok"
         })*/

        console.log(response);
        //window.location.reload();
      } else {
        this.setState({
          message: "incorrect username or password",
          textStyle: "danger",
        });
      }
    });
  };

  render() {
    return (
      <>
        <Header />
        <br />

        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <form className="loginForm" onSubmit={this.handleSubmit}>
                <br></br>
                <p className="normal">Welcome</p>
                <p>Login</p>

                <br></br>

                <div className="form-group " style={{ display: "flex" }}>
                  <label>
                    <span
                      className="fa fa-user"
                      style={{ fontSize: "28px" }}
                    ></span>{" "}
                  </label>

                  <div className="col-sm-12">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Username"
                      name="username"
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group" style={{ display: "flex" }}>
                  <label>
                    <span
                      className="fa fa-lock"
                      style={{ fontSize: "28px" }}
                    ></span>{" "}
                  </label>

                  <div className="col-sm-12">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      name="password"
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="col-sm-offset-2 col-sm-11">
                    {this.state.message !== "" && (
                      <div className={`text text-${this.state.textStyle}`}>
                        {this.state.message}
                      </div>
                    )}
                    <br />

                    <Route
                      render={({ history }) => (
                        <button
                          type="submit"
                          className="text-white"
                          onClick={(e) => this.handleSubmit(e, history)}
                        >
                          Submit
                        </button>
                      )}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Login;
