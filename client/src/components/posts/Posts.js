import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPosts } from '../../actions/postActions';
import PropTypes from 'prop-types';
import PostItem from './PostItem';
import PostFeed from './PostFeed';
import PostForm from './PostForm';
import MyEmojiRenderer from './MyEmojiRenderer';

import GET_POSTS from '../../actions/types';
import Spinner from '../common/Spinner';




class Posts extends Component {
  
  componentDidMount() {
    this.props.getPosts();
  }

  
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
    const { posts, loading } = this.props;
    
    let postContent;
    

    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <PostFeed posts={posts} />;
    }


    return (
      <div className="feed">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <PostForm />
            {postContent}
          </div>
        </div>
      </div>
    </div>
  );
}
}


Posts.propTypes = {
getPosts: PropTypes.func.isRequired,
post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);