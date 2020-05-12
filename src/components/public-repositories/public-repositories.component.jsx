import React from 'react';
import './public-repositories.styles.scss';

const PublicRepositories = ({ user, repo }) => (
  <div className='public-repositories'>
    <h2>Public repositories from user {user}</h2>

    {repo.map((repository) => (
      <div key={repository.id}>{repository.name}</div>
    ))}
  </div>
);

export default PublicRepositories;
