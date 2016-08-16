import React from 'react';

class Comment extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     isEditing: false;
  //   };
  // }

  render() {
    return (
      <div className="comment">
        <p className="comment-header">{this.props.comment.name}</p>
        <p className="comment-body">
          {this.props.comment.description}
        </p>
        <div className="comment-form-fields">
          <input placeholder="Edit comment" ref='editInput'}/>
          <br/>
          <br/>
        </div>
        <div className="comment-footer">

          <button className='comment-footer-edit' type='submit'}>
            Edit comment
          </button>
          <br/>
          <button className="comment-footer-delete" onClick={this._handleDelete.bind(this)}>
            Delete comment
          </button>
        </div>
      </div>
    );
  }

  _handleDelete(event) {
    event.preventDefault();
    // if (confirm('Are you sure?')) {
      this.props.onDelete(this.props.comment);
    // }
  }
}

export default Comment;
