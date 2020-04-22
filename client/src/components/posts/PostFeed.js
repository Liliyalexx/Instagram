import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostItem from './PostItem';

class PostFeed extends Component {
  componentDidMount() {
    this.props.getPost();
  }

  render() {
    const { posts, loading } = this.props.posts;
    const {user}

    return posts.map(post => <PostItem key={post._id} post={post} />);
    
  }
}

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired
};

export default PostFeed;