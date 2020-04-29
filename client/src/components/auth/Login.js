import '../../css/login.css';
import React, { Component } from "react";
import { connect } from "react-redux";
// import classnames from "classnames";
import { loginUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import {Link} from 'react-router-dom';




class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(user);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/create-profile");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/create-profile");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  state = {
    isPasswordShown: false
  }
  togglePasswordVisibility = () =>{
    const {isPasswordShown} = this.state;
    this.setState ({isPasswordShown :!isPasswordShown});
  }
  render() {
    const { errors } = this.state;
    const {isPasswordShown} = this.state;

    return (
     
      <div className="wrapper"> 
      
      <div id="backgroundCarousel" className="carousel slide" data-ride="carousel">
      <ol className="carousel-indicators">
        <li data-target="#backgroundCarousel" data-slide-to="0" className="active"></li>
        <li data-target="#backgroundCarousel" data-slide-to="1"></li>
        <li data-target="#backgroundCarousel" data-slide-to="2"></li>
      </ol>
      <div className="carousel-inner">
        <div className="carousel-item active">
          {/*Photo by Muhd Asyraaf on Unsplash*/}
        <img className="d-block w-100 img-size" src="https://images.unsplash.com/photo-1511649475669-e288648b2339?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1778&q=80" alt="First slide" />
        </div>
        <div className="dark-overlay"></div>
        <div className="carousel-item">
          {/*Photo by Luis Alfonso Orellana on Unsplash*/}
        <img className="d-block w-100 img-size" src="https://images.unsplash.com/photo-1472289065668-ce650ac443d2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80" alt="Second slide" />
        </div>
        <div className="dark-overlay"></div>
        <div className="carousel-item">
          {/*Photo by Anders Jildén on Unsplash*/}
          <img className="d-block w-100 img-size" src="https://images.unsplash.com/photo-1454944338482-a69bb95894af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1652&q=80"
          alt="Third slide" />
          <div className="dark-overlay"></div>
        </div>
      </div>
      </div>
      <div className="main-content"  id = "login">
        <div className="header">
          <img className="header-cover" alt="logo" src={require("../../img/Instagram_logo.jpg")} />
        </div>
        <form onSubmit={this.onSubmit}>
          <div>
          <TextFieldGroup 
            placeholder="Email Address"
            name = "email" 
            value = {this.state.email}
            onChange = {this.onChange}
            errors = {errors.email}
          />
          </div>
          <div>
          <i className = "fa fa-eye password-icon" 
          onClick= {this.togglePasswordVisibility} />
          <TextFieldGroup 
            placeholder="Password"
            name = "password" 
            type = {(isPasswordShown) ? "text": "password"}
            value = {this.state.password}
            onChange = {this.onChange}
            errors = {errors.password}
          />
          </div>
          <input type="submit" value="Log in" className="btn" />
        </form>
        <div className="fogot-pass">
          <Link className="main-link" to="/register">Forgot password?</Link>
        </div>
      </div>
      <div className="sub-content">
          Don't have an account? <Link className="sub-link" to="/create-profile">Create profile</Link>
      </div>
    </div>
    
    )
}
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);