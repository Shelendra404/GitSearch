import React from 'react';
import './repository-commits.styles.scss';

const RepositoryCommits = ({ data, lastRepo, getDate }) => (
  <div className='commits'>
    <h2>Commits for repository [{lastRepo}]</h2>
    {data.map((commit) => (
      <div className='commits-list' key={commit.sha}>
        <div>
          <div className='info'>
            <div className='date'>{getDate(commit.commit.author.date)}</div>
            <div className='committer'>
              <img
                className='commit-avatar'
                alt=''
                src={
                  commit.author
                    ? commit.author.avatar_url
                    : `https://github.com/identicons/${commit.author}.png`
                }></img>
              {commit.author !== null
                ? commit.author.login
                : commit.commit.author.name}
            </div>
          </div>
          <div className='message-row'>
            <div className='title'>Message:</div>
            <div className='message'>{commit.commit.message}</div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default RepositoryCommits;
