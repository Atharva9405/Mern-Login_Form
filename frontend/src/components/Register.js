import React from "react";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route } from "react-router-dom";
import swal from "sweetalert";
import Header from "./header";

import axios from "axios";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {},
      errors: {},
    };
    this.baseState = this.state;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    let input = this.state.input;
    input[event.target.name] = event.target.value;

    this.setState({
      input,
    });
  };

  handleReset = (event) => {
    event.preventDefault();
    let input = {};
    input["firstName"] = "";
    input["middleName"] = "";
    input["lastName"] = "";
    input["email"] = "";
    input["mobileNo"] = "";
    input["address"] = "";
    input["userId"] = "";
    input["password"] = "";
    input["message"] = "";

    this.setState(this.baseState);

    this.setState({ input: input });
  };

  handleSubmit = (event, history) => {
    event.preventDefault();

    if (this.validate()) {
      console.log(this.state);

      //reset after registration!
      /* let input = {};
       input["firstName"] = "";
       input["middleName"] = "";
       input["lastName"] = "";
       input["email"] = "";
       input["mobileNo"] = "";
       input["address"] = "";
       input["userId"] = "";
       input["password"] = "";
       input["message"]="";
       
       this.setState({input:input});*/

      console.log(this.state.input);
      alert("successfully registered");

      // post data in database
      axios
        .post("http://localhost:4444/api/user/register", this.state.input)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });

      if (history) {
        history.push("/Login");
      }
    }
  };

  validate() {
    let input = this.state.input;
    let errors = {};
    let isValid = true;

    //required fields
    if (
      !input["firstName"] ||
      !input["lastName"] ||
      !input["email"] ||
      !input["mobileNo"] ||
      !input["address"] ||
      !input["userId"] ||
      !input["password"]
    ) {
      isValid = false;
      errors["message"] = "All * mentioned fields are mandatory.";
    } else {
      //username validation
      if (typeof input["userId"] !== "undefined") {
        var pattern = new RegExp(/[*^#!~|\"%:<>[\]{}`\\()';@&$]/);
        if (pattern.test(input["userId"])) {
          isValid = false;
          errors["userId"] = "Username should not contain special characters.";
        }
      }

      //password validation
      if (typeof input["password"] !== "undefined") {
        var pattern = new RegExp(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
        );
        if (!pattern.test(input["password"])) {
          isValid = false;
          errors["password"] =
            "Password must be at least 8 characters long, should contain at-least 1 Uppercase,1 Lowercase,1 Numeric and 1 special character.";
        }
      }

      //mobile no. validation
      if (typeof input["mobileNo"] !== "undefined") {
        var pattern = new RegExp(/^[0-9\b]+$/);

        if (!pattern.test(input["mobileNo"])) {
          isValid = false;

          errors["mobileNo"] = "Please enter only number.";
        } else if (input["mobileNo"].length != 10) {
          isValid = false;

          errors["mobileNo"] = "Please enter valid phone number.";
        }
      }

      //email validation
      if (typeof input["email"] !== "undefined") {
        var pattern = new RegExp(
          /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
        );
        if (!pattern.test(input["email"])) {
          isValid = false;
          errors["email"] = "Please enter valid email address.";
        }
      }
    }
    this.setState({
      errors: errors,
    });

    return isValid;
  }

  render() {
    return (
      <>
        <Header />
        <div className="container">
          <form className="registerForm" onSubmit={this.handleSubmit}>
            <br></br>
            <div className="form-group" style={{ display: "flex" }}>
              <label className="control-label col-sm-2 "> *FirstName:</label>
              <div className="col-sm-11">
                <input
                  type="text"
                  style={{ height: "90%", width: "40%" }}
                  className="form-control input-sm"
                  name="firstName"
                  maxLength="25"
                  onChange={this.handleChange}
                  value={this.state.input.firstName}
                  required
                />
              </div>
            </div>

            <div className="form-group " style={{ display: "flex" }}>
              <label className="control-label col-sm-2 ">MiddleName:</label>
              <div className="col-sm-11">
                <input
                  type="text"
                  style={{ height: "90%", width: "40%" }}
                  className="form-control input-sm"
                  name="middleName"
                  onChange={this.handleChange}
                  value={this.state.input.middleName}
                />
              </div>
            </div>

            <div className="form-group" style={{ display: "flex" }}>
              <label className="control-label col-sm-2 ">*LastName:</label>
              <div className="col-sm-11">
                <input
                  type="text"
                  style={{ height: "90%", width: "40%" }}
                  className="form-control input-sm"
                  name="lastName"
                  maxLength="25"
                  onChange={this.handleChange}
                  value={this.state.input.lastName}
                  required
                />
              </div>
            </div>

            <div className="form-group " style={{ display: "flex" }}>
              <label className="control-label col-sm-2 ">*Email:</label>
              <div className="col-sm-11">
                <input
                  type="text"
                  style={{ height: "90%", width: "40%" }}
                  className="form-control input-sm"
                  name="email"
                  onChange={this.handleChange}
                  value={this.state.input.email}
                  required
                />
                <div className="text-danger">{this.state.errors.email}</div>
              </div>
            </div>

            <div className="form-group " style={{ display: "flex" }}>
              <label className="control-label col-sm-2 ">*Mobile#:</label>
              <div className="col-sm-11">
                <input
                  type="text"
                  style={{ height: "90%", width: "40%" }}
                  className="form-control input-sm"
                  name="mobileNo"
                  onChange={this.handleChange}
                  value={this.state.input.mobileNo}
                  required
                />
                <div className="text-danger">{this.state.errors.mobileNo}</div>
              </div>
            </div>

            <div className="form-group " style={{ display: "flex" }}>
              <label className="control-label col-sm-2 ">*Address:</label>
              <div className="col-sm-11">
                <input
                  type="text"
                  style={{ height: "90%", width: "40%" }}
                  className="form-control input-sm"
                  name="address"
                  maxLength="50"
                  onChange={this.handleChange}
                  value={this.state.input.address}
                  required
                />
              </div>
            </div>

            <div className="form-group " style={{ display: "flex" }}>
              <label className="control-label col-sm-2 ">*UserID:</label>
              <div className="col-sm-11">
                <input
                  type="text"
                  style={{ height: "90%", width: "40%" }}
                  className="form-control input-sm"
                  name="userId"
                  onChange={this.handleChange}
                  value={this.state.input.userId}
                  required
                />
                <div className="text-danger">{this.state.errors.userId}</div>
              </div>
            </div>

            <div className="form-group " style={{ display: "flex" }}>
              <label className="control-label col-sm-2">*Password:</label>
              <div className="col-sm-11">
                <input
                  type="password"
                  style={{ height: "90%", width: "40%" }}
                  className="form-control input-sm"
                  name="password"
                  onChange={this.handleChange}
                  value={this.state.input.password}
                  required
                />
                <div className="text-danger">{this.state.errors.password}</div>
              </div>
            </div>

            <div className="form-group" style={{ display: "flex" }}>
              <label className="control-label col-sm-2"></label>
              <div className="col-sm-offset-2 col-sm-11">
                <div className="text-danger">{this.state.errors.message}</div>
                <br></br>
                <Route
                  render={({ history }) => (
                    <button
                      type="submit"
                      className="btn btn-primary mr-2"
                      onClick={(e) => this.handleSubmit(e, history)}
                    >
                      Submit
                    </button>
                  )}
                />

                <button
                  type="reset"
                  className="btn btn-primary"
                  onClick={this.handleReset}
                >
                  Reset
                </button>
              </div>
            </div>
          </form>
        </div>
      </>
    );
  }
}
export default Register;
