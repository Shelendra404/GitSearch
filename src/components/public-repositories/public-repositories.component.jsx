import React from 'react';
import './public-repositories.styles.scss';

const PublicRepositories = ({ user, repo, onClick }) => (
  <div>
    <h2>Public repositories from user {user.username}</h2>

    {repo.map((repository) => (
      <div className='repositories' key={repository.id}>
        <div className='repository-link'>
          <a
            href={repository.html_url}
            target='_blank'
            rel='noreferrer noopener'>
            {repository.name}
          </a>
        </div>
        <div>
          <button
            className='commit-button'
            onClick={() => onClick(repository.name)}>
            Get Commits
          </button>
          <br />
        </div>
      </div>
    ))}
  </div>
);

export default PublicRepositories;
