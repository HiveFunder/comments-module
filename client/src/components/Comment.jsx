import React from 'react';
import moment from 'moment';
import styles from '../../dist/style.css';
import Replies from './Replies';

const Comment = (props) => {
  const { comment } = props;
  const profilePictureURL = comment.profilePicture;
  const timeAgo = moment(comment.createdAt).fromNow();
  let creatorLogo;
  let greenBarSpan;
  if (comment.author === comment.projectAuthor) {
    creatorLogo = <img src="https://i.postimg.cc/Pr8qdjjH/Creator-Logo.png" alt="creatorlogo" className={styles.creatorLogo} />;
    greenBarSpan = <span className={styles.greenbar} />;
  }
  return (
    <div>
      <div className={styles.commentBlock}>
        {greenBarSpan}
        <span>
          <div className={styles.authorPicAndTime}>
            <span>
              <img className={styles.profilePicture} src={`../images/${profilePictureURL}`} alt="profilepic" />
            </span>
            <span>
              <p className={styles.authorName}>{comment.author}</p>
              <p className={styles.timeago}>
                about&nbsp;
                {timeAgo}
              </p>
            </span>
            <span>
              {creatorLogo}
            </span>
          </div>
          <p className={styles.commentBody}>{comment.body}</p>
        </span>
      </div>
      <Replies replies={comment.replies} projectAuthor={comment.projectAuthor} />
    </div>
  );
};

export default Comment;
