import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch,
} from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <>
        <div className="text-center">
          <Link to="/Login">
            <button className="mr-2 btn btn-info">Login</button>
          </Link>
          <Link to="/Register">
            <button className="btn btn-info">Register</button>
          </Link>
          <Link to="/update"></Link>
        </div>
      </>
    );
  }
}
export default Header;
