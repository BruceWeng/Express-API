import React from 'react';
import Comment from './Comment';

class CommentBox extends React.Component {
  _getComments() {
    const commentList = [
      { id: 1, author: 'Morgan McCircuit', body: 'Great picture!' },
      { id: 2, author: 'Bending Bender', body: 'Excellent stuff'}
    ];

    return commentList.map((comment) => {
      return (
        <Comment
          author={comment.author} body={comment.body} key={comment.id} />
      )
    });
  }

  render() {
    const comments = this._getComments();
    return (
      <div className="comment-box">
        <h3>Comments</h3>
        <h4 className="comment-count">{comments.length} comments</h4>
        <div className="comment-list">
          {comments}
        </div>
      </div>
    );
  }
}

export default CommentBox;
