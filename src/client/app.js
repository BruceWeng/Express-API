import React from 'react';
import ReactDOM from 'react-dom';
import CommentBox from './components/CommentBox';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello React</h1>
        <CommentBox />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
