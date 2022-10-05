import React, {Component} from "react";
import Button from "../../../components/atoms/Button";
import {connect} from "react-redux";
import {loginUserAPI} from "../../../config/redux/action";

class Login extends Component {
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
    const {history} = this.props;
    const res = await this.props
      .loginAPI({email, password})
      .catch((err) => err);
    if (res) {
      console.log("Login Success", res);
      localStorage.setItem("userData", JSON.stringify(res));
      this.setState({
        email: "",
        password: "",
      });
      history.push("/");
    } else {
      console.log("Login Failed");
    }
  };

  render() {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <p className="auth-title">Login Page</p>
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
            title="Login"
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
  loginAPI: (data) => dispatch(loginUserAPI(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
