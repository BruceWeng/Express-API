import React from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';
import $ from 'jQuery';

class CommentBox extends React.Component {
  constructor() {
    super();
    this.state = {
      showComments: false,
      comments: [
        { id: 1, author: 'Morgan McCircuit', body: 'Great picture!' },
        { id: 2, author: 'Bending Bender', body: 'Excellent stuff'}
      ]
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

  _addComment(author, body) {
    const comment = { author,body };
    $.ajax({
      method: 'POST',
      url: '/blocks',
      data: { comment },
      dataType: 'jsonp',
      success: (newComment) => {
        this.setState({ comments: this.state.comments.concat([newComment]) });
      }
    });
  }

  _fetchComments() {
    $.ajax({
      method: 'GET',
      url: '/blocks',
      dataType: 'jsonp',
      success: (comments) => {
        this.setState({ comments });
      }
    });
  }

  _deleteComment (comment) {
    $.ajax({
      method: 'DELETE',
      url: `/blocks/${comment.id}`,
      dataType: 'jsonp'
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

  componentDidMount() {
    this._timer = setInterval(() => this._fetchComments(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this._timer);
  }
}

export default CommentBox;