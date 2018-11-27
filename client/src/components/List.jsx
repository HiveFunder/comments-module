import React from 'react';
import Comment from './Comment';
import styles from '../../dist/style.css';

const List = (props) => {
  const { list } = props;
  return (
    <div className={styles.backgroundDiv}>
      {list.map(element => <Comment key={element._id} comment={element} projectAuthor={list.projectAuthor} />)}
    </div>
  );
};

export default List;
