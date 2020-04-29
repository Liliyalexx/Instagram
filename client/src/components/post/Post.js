import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPost } from '../../actions/postActions';
import PropTypes from 'prop-types';
import CommentItem from './PostItem';
import CommentFeed from './PostFeed';
import CommentForm from './PostForm';
import MyEmojiRenderer from './MyEmojiRenderer.js';

import GET_POST from '../../actions/types';
import Spinner from '../common/Spinner';




class Post extends Component {
  
  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if (nextProps) {
      this.props.history.push('/posts')
    }
    if (nextProps.errors){
      this.setState({errors: nextProps.errors});
    }
  }
  render() {
    const { post, loading } = this.props.post;
    
    let postContent = {};
    

    if (post === null || loading || Object.keys(post).length === 0) {
      
      postContent = <Spinner />;
    } else {
    
      postContent = (
        <div>
          <CommentItem post={post} showActions={false} />
          <CommentFeed postId={post._id} />
          <CommentForm postId={post._id} />
          <MyEmojiRenderer postId ={post._id} />
        </div>
      );
    }


    return (

    <div className="post">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <Link to="/post" className="btn btn-light mb-3">
            Back To Feed
          </Link>
          {postContent}
        </div>
      </div>
    </div>
  </div>
    )
  };
}


Post.propTypes = {
getPost: PropTypes.func.isRequired,
post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);