import React from 'react';

const RepositoryCommits = ({ data, lastRepo, getDate }) => (
  <div className='commits'>
    <h2>Commits for repository [{lastRepo}]</h2>
    {data.map((commit) => (
      <div key={commit.sha}>
        <div>
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
        <div>{getDate(commit.commit.author.date)}</div>
        <div>{commit.commit.message}</div>
      </div>
    ))}
  </div>
);

export default RepositoryCommits;
