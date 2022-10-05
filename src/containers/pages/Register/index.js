import React, {Component} from "react";
import "./Register.scss";
import Button from "../../../components/atoms/Button";
import {registerUserAPI} from "../../../config/redux/action";
import {connect} from "react-redux";

class Register extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChangeText = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleChangeSubmit = async () => {
    const {email, password} = this.state;
    const res = await this.props
      .registerAPI({email, password})
      .catch((err) => err);
    if (res) {
      this.setState({
        email: "",
        password: "",
      });
    }
  };

  render() {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <p className="auth-title">Register Page</p>
          <input
            type="text"
            placeholder="Email"
            className="input"
            onChange={this.handleChangeText}
            id="email"
            value={this.state.email}
          />
          <input
            type="password"
            placeholder="Password"
            className="input"
            onChange={this.handleChangeText}
            id="password"
          />
          <Button
            onClick={this.handleChangeSubmit}
            title="Register"
            loading={this.props.isLoading}
            value={this.state.password}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  registerAPI: (data) => dispatch(registerUserAPI(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
