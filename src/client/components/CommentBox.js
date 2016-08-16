import React from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';
import $ from 'jQuery';

class CommentBox extends React.Component {
  constructor() {
    super();
    this.state = {
      showComments: false,
      comments: []
    };
  }

  _getComments() {
    return this.state.comments.map((comment) => {
      return (
        <Comment
          key={comment.id}
          comment={comment}
          onDelete={this._deleteComment.bind(this)} />
      );
    });
  }
  _getCommentsTitle(commentCount) {
    if (commentCount === 0) {
      return 'No comments yet';
    } else if (commentCount === 1) {
      return '1 comment';
    } else {
      return `${commentCount} comments`;
    }
  }

  _handleClick() {
    this.setState({
      showComments: !this.state.showComments
    });
  }

  _addComment(name, description) {
    const comment = { name, description };
    $.ajax({
      method: 'POST',
      url: 'api/comments',
      data: comment,
      success: (newComment) => {
        this.setState({ comments: this.state.comments.concat([newComment]) });
      }
    });
  }

  _fetchComments() {
    $.ajax({
      method: 'GET',
      url: 'api/comments',
      success: (comments) => {
        this.setState({ comments });
      }
    });
  }

  _deleteComment (comment) {
    $.ajax({
      method: 'DELETE',
      url: `api/comments/${comment.id}`,
    });

    const comments = [...this.state.comments];
    const commentIndex = comments.indexOf(comment);
    comments.splice(commentIndex, 1);
    this.setState({ comments });
  }

  componentWillMount() {
    this._fetchComments();
  }

  render() {
    const comments = this._getComments();
    let commentNodes;
    let buttonText = 'Show comments';
    if (this.state.showComments) {
      buttonText = 'Hide comments';
      commentNodes = <div className="comment-list">{comments}</div>;
    }
    return (
      <div className="comment-box">
        <CommentForm addComment={this._addComment.bind(this)} />
        <h3>Comments</h3>
        <h4 className="comment-count">
          {this._getCommentsTitle(comments.length)}
        </h4>
        <button onClick={this._handleClick.bind(this)}>{buttonText}</button>
        {commentNodes}
      </div>
    );
  }

  // componentDidMount() {
  //   this._timer = setInterval(() => this._fetchComments(), 5000);
  // }

  componentWillUnmount() {
    clearInterval(this._timer);
  }
}

export default CommentBox;
