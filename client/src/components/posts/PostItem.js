import '../../css/post-feed.css';

import React, { Component } from 'react';
import Emoji from "react-emoji-render";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { addComment, deletePost, addLike, removeLike, addBookmark, removeBookmark,MyEmojiRenderer } from '../../actions/postActions';
import { addPost } from '../../actions/postActions';
import GET_POST from '../../actions/types';

class PostItem extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
      errors: {}
    };   
    
  }
  componentDidMount() {
    
    if (this.props.match.params.id) {
      this.props.addPost(this.props.match.params.id);
    }
   
  }

  onDeleteClick (id) {
    this.props.deletePost(id);
  }

  onLikeClick(id){
    this.props.addLike(id);
  }

  onDislikeClick(id){
    this.props.removeLike(id);
  }
  onMyEmojiRendererClick(id){
    this.props.addEmoji(id)

  }
  findUserLike(likes){
    const{auth} = this.props;
    if (likes.filter(like => like.user ===auth.user.id).length >0){
      return true;
    } else {
      return false;
    }
  }


  render() {
    const { post, showActions, auth } = this.props;
    

    return (
 
    <div className=" col-8 post">
      <div className="post-header">
          <img src={ post.avatar } alt="avatar" />
        <div className="username">{ post.handle }</div>

        {post.user === auth.user.id ? (
              <div
                onClick={this.onDeletePostClick.bind(this, post._id)}
                type="button"
                className="post-delete"
              >
                <i className="fas fa-times" />
              </div>
            ) : null}

      </div>     
      <div className="post-container">
      <img src={post.image} alt="instagram post" 
      className="post-img"/>
      </div>
      <div className="post-bottom">

        <div className="like-icon"
          onClick={this.onLikeDislikeClick.bind(this, post._id, post.likes)} 
          type="button">
          <i className={classnames('far fa-heart', {'fas fa-heart red-heart': 
          this.findUserId(post.likes)})}></i></div>
          

        <Link to={`/comments/${post._id}`} 
        className="comment-icon">
        <i className="far fa-comment"></i>
        </Link>

        <div className="bookmark-icon"
          onClick={this.onAddRemoveBookmarkClick.bind(this, post._id, post.bookmarks)} 
          type="button">
          <i className={classnames("far fa-bookmark", {'fas fa-bookmark': this.findUserId(post.bookmarks)})}>
          </i>
          </div>  

        <div className="likes">{post.likes.length} likes</div>
        <div>
          <span className="username-caption">{post.handle}</span>
          <span className="post-caption">{post.text}</span>
        </div>  

        <div className="timestamp">{Date.now - post.date}4 Hours Ago</div>

        <Link to={`/comments/${post._id}`}>
        { post.comments.length === 1 && ( <div className="comments">View {post.comments.length} comment...</div>)}
        { post.comments.length > 1  && <div className="comments">View all {post.comments.length} comments...</div>}
        </Link>
      </div>  
      <div className="input-contanier">
      <form onSubmit={this.onSubmit}>
          <div className="input-group mb-3">
          
            <input type="text" 
            className="form-control comment-input" 
            placeholder="Add a comment..." 
              name="text" 
              value={this.state.text}  
              onChange={this.onChange} required/>
            <div className="input-group-append">
              <button 
              className="btn post-button" 
              type="submit" >Post
              </button>
            </div>
          </div>
          </form>
      </div>
    </div>

    );
  }
}



  
  PostItem.propTypes = {
    addBookmark: PropTypes.func.isRequired,
    removeBookmark: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    MyEmojiRenderer: PropTypes.object.isRequired,

  };
  
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });
  
  export default connect(mapStateToProps, { addPost, addComment, addLike, removeLike, addBookmark, removeBookmark, deletePost,MyEmojiRenderer  })(PostItem);
  
