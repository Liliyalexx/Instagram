import '../../css/profile.css'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Spinner from '../common/Spinner';
// import CreateProfile from '../create-profile/CreateProfile';
import { getCurrentProfile, follow, unfollow } from '../../actions/profileActions';
import { getPosts } from '../../actions/postActions';
import FacebookFollow from './FacebookFollow';



class Profile extends Component {
  

  componentDidMount() {
    
    if (this.props.match.params.handle) {
      this.props.getCurrentProfile(this.props.match.params.handle);
    }
   
  }

  onFollowUnfollowClick(params, id, handle) {
    if (this.findUserId(params)) {
      this.props.follow(id, handle);
    } else {
      this.props.unfollow(id, handle);
    }
  }

 // Checking for user Id in likes and bookmarks
  findUserId(params) {
    console.log(typeof params);
    console.log(params);
    const { auth } = this.props.auth;
    if (params.filter(param => param.user === auth.user.id).length > 0) {
      return true;
    } else {

      return false;
    }
  }


    componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {

      this.props.history.push('/not-found');
    }
  }  
  
  
  render() {
    const  { profile } = this.props;
    const  { loading, posts } = this.props;
    const { user } = this.props.auth;
    let profileContent, postContent;
    
   

    if (profile === null || loading) {
      profileContent = <Spinner/>
    } else {
         profileContent = (
        <div className="row main-containier">
          <div className="col-6 profile-avatar ">
          <img src={user.avatar} alt="" />
          </div>
          <div className="col-6">
          <div className="row profile-user-settings">
              <div className="profile-user-name">{this.props.match.params.handle}</div>
              {this.props.auth.isAuthenticated ? user.handle === this.props.match.params.handle ?
                <Link to="/edit-profile" className="btn profile-edit-btn">Edit Profile</Link> : 
                
                <div className="btn profile-edit-btn"
                  onClick={this.onFollowUnfollowClick.bind( profile.following, profile.user._id, profile.user.handle)} 
                  type="button">
                  {this.findUserId(profile.following) ? "Unfollow" : "Follow"}</div>
                : undefined}
            </div>
            <div className="row profile-stats">
                <div>
                <span className="profile-stat-count">164</span> posts
                </div>
                <div>
                <span className="profile-stat-count">{user.followers !== undefined && profile.followers.length }
                </span> followers
                </div>
                <div>
                <span className="profile-stat-count">{user.following !== undefined && profile.following.length }
                </span> following
                </div>
            </div>
            <div className="profile-bio">
              <div className="profile-real-name">{user.name}
              </div> 
              <div>{user.bio}</div>
            </div>
          </div>
        </div>  
      );
    }
              
    return (
      <div>
        <header>
          {profileContent}
      </header>
      <main>

      </main>
      </div>
    )
  }
}       

 Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
  follow: PropTypes.func.isRequired,
  unfollow: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
  profile: PropTypes.object.isRequired,
};
  
const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  post: state.post
});

export default connect(mapStateToProps, { getCurrentProfile})(Profile);
