import React from 'react';
import $ from 'jquery';
import List from './List';
import Post from './Post';
import styles from '../../dist/style.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      _id: null,
      author: null,
      comments: [],
    };
  }

  componentDidMount() {
    const splitURL = window.location.href.split('/');
    console.log(splitURL);
    const projectId = typeof parseInt(splitURL[splitURL.length - 1]) === 'number' ? splitURL[splitURL.length - 1] : 44;
    $.get(`http://localhost:3001/${projectId}/comments`, (data) => {
      console.log('Server response:', data);
      this.setState({
        _id: data.id,
        author: data.author,
        comments: data.comments,
      });
    });
  }

  render() {
    return (
      <div className={styles.everything}>
        <div>
          <Post />
          <List projectAuthor={this.state.author} list={this.state.comments} />
        </div>
      </div>
    );
  }
}

export default App;
