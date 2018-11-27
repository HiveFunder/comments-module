import React from 'react';
import moment from 'moment';
import styles from '../../dist/style.css';

const Reply = (props) => {
  const { reply } = props;
  const profilePictureURL = reply.profilePicture;
  const timeAgo = moment(reply.createdAt).fromNow();
  let creatorLogo;
  let greenBarSpan;
  const indentationSpan = <span className={styles.indentationSpan} />;
  if (reply.authorIsCreator === reply.projectAuthor) {
    creatorLogo = <img src="https://i.postimg.cc/Pr8qdjjH/Creator-Logo.png" alt="creatorlogo" className={styles.creatorLogo} />;
    greenBarSpan = <span className={styles.greenbar} />;
  }
  return (
    <div className={styles.commentBlock}>
      {indentationSpan}
      {greenBarSpan}
      <span>
        <div className={styles.authorPicAndTime}>
          <span>
            <img className={styles.profilePicture} src={`../images/${profilePictureURL}`} alt="profilepic" />
          </span>
          <span>
            <p className={styles.authorName}>{reply.author}</p>
            <p className={styles.timeago}>
              about&nbsp;
              {timeAgo}
            </p>
          </span>
          <span>
            {creatorLogo}
          </span>
        </div>
        <p className={styles.commentBody}>{reply.body}</p>
      </span>
    </div>
  );
};

export default Reply;
