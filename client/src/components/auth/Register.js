import '../../css/register.css';
import React, { Component } from "react";
// import classnames from "classnames";
import { connect } from 'react-redux';
import {registerUser} from '../../actions/authActions';
import PropTypes from 'prop-types';
import TextFieldGroup from "../common/TextFieldGroup";
import {Link} from 'react-router-dom';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }


  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      
    };

 
    this.props.registerUser(newUser, this.props.history);
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.auth.isAuthenticated){
      this.props.history.push("/create-profile");
    }
    if(nextProps.errors){
      this.setState({errors: nextProps.errors});
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
    const {isPasswordShown} = this.state;
   

    const { errors } = this.state;
    
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
      <div className="main-content" id = "register">
        <div className="header">
          <img alt="logo" src={require("../../img/Instagram_logo.jpg")} />
        </div>
        <form onSubmit={this.onSubmit}>
          <div>
            <TextFieldGroup 
              placeholder="Full Name"
              name = "name" 
              value = {this.state.name}
              onChange = {this.onChange}
              errors = {errors.name}
            />
            </div>
            <div>
            <TextFieldGroup 
              placeholder="Username"
              name = "handle" 
              value = {this.state.handle}
              onChange = {this.onChange}
              errors = {errors.handle}
            />
          </div>
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
              type = {(isPasswordShown) ? "text": "password"}
              name = "password" 
              value = {this.state.password}
              onChange = {this.onChange}
              errors = {errors.password}
            />
             </div>
        
          <input type="submit" value="Sign up" className="btn" />
        </form>
      </div>
      <div className="sub-content">
          Have an account? <Link className="sub-link" to="/login">Log in</Link>
      </div>
    </div>
    )
  }
}
     
  
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});


export default connect(mapStateToProps, {registerUser})(Register);