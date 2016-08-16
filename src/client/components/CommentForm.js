import React from 'react';

class CommentForm extends React.Component {
  _handleSubmit(event) {
    event.preventDefault();
    let name = this._name;
    let description = this._description;
    this.props.addComment(name.value, description.value);
    this._name.value = '';
    this._description.value = '';
  }

  render() {
    return (
      <form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
        <label>Join the discussion</label>
        <div className="comment-form-fields">
          <input placeholder="Name:" ref={(input) => this._name = input}/>
          <br/>
          <br/>
          <textarea placeholder="Comment:" ref={(textarea) => this._description = textarea}></textarea>
        </div>
        <br/>
        <div className="comment-form-actions">
          <button type="submit">Post comment</button>
        </div>
      </form>
    );
  }
}

export default CommentForm;
