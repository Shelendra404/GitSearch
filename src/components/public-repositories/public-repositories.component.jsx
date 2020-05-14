import React from 'react';
import './public-repositories.styles.scss';

const PublicRepositories = ({ user, repo, onClick }) => (
  <div className='public-repositories'>
    <h2>Public repositories from user {user.username}</h2>

    {repo.map((repository) => (
      <div key={repository.id}>
        <a href={repository.html_url} target='_blank' rel='noreferrer noopener'>
          {repository.name}
        </a>
        <button onClick={() => onClick(repository.name)}>Get Commits</button>
        <br />
      </div>
    ))}
  </div>
);

export default PublicRepositories;
