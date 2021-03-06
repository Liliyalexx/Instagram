import '../../css/create-profile.css'

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
// import InputGroup from '../common/InputGroup';
import { createProfile } from '../../actions/profileActions';


class CreateProfile extends Component {
  
  
  constructor(props) {
    super(props);
    this.state = {
      name:'',
      handle: '',
      website: '',
      bio: '',
      follow:'',
      unfollow:'',
      posts:'',
      profile:'',

      errors: {}
    };

    
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if (nextProps) {
      this.props.history.push(`/profile`);
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }



  onSubmit(e) {
    e.preventDefault();

    const { profile} = this.props.auth;
    const profileData = {
      name:this.state.name,
      avatar: this.state.avatar,
      handle: this.state.handle,
      website: this.state.website,
      bio: this.state.bio,
      follow: this.state.follow,
      unfollow:this.state.unfollow,
      posts: this.state.posts,

    }
    this.props.createProfile(profileData, this.props.history);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  
    render() {
    const { errors } = this.state;
    const { isAuthenticated, user} = this.props.auth;
    // const {profile} = this.state.profile;
     

    return (
      <div className="wrapper">
    <div className="main-content">
      <div className="header">

      <div className="create-profile" id = "create profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h4 className="display-4 text-center"> Create Your Profile</h4>
              <small className="d-block pb-3"> * = required fields</small>
              <form onSubmit={this.onSubmit}>
             
              <TextFieldGroup
              placeholder="avatar" 
               name="avatar" 
                value={this.state.avatar}  
                onChange={this.onChange}
                error={errors.avatar}
                info="A unique avatar for your profile URL."
                /> 
                <TextFieldGroup
                  placeholder="* Profile Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                  info="Your name"
                />  
                           
              <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL."
                />
                
                
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Could be your own website or a company one"
                />
            
                <TextAreaFieldGroup
                  placeholder="Short Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Tell us a little about yourself"
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                              
                />

               
              </form>
            </div>
          </div>
        </div>
      </div>
      </div>
        </div>
      </div>

    );
  }
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth:state.auth
});

export default connect(mapStateToProps, { createProfile })
  (CreateProfile);