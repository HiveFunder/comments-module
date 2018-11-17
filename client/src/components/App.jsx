import React from 'react';
import $ from 'jquery';
import List from './List';
import Post from './Post';
import styles from '../../dist/style.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      commentList: [],
    };
  }

  componentDidMount() {
    const splitURL = window.location.href.split('/');
    console.log(splitURL);
    const projectId = typeof parseInt(splitURL[splitURL.length - 1]) === 'number' ? splitURL[splitURL.length - 1] : 44;
    $.get(`/foobar/${projectId}/comments`, (data) => {
      this.setState({
        commentList: JSON.parse(data).comments,
      });
    });
  }

  render() {
    return (
      <div className={styles.everything}>
        <div>
          <Post />
          <List list={this.state.commentList} />
        </div>
      </div>
    );
  }
}

export default App;
