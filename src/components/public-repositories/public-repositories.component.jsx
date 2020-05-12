import React from 'react';

const PublicRepositories = ({ user, repo }) => (
  <div className='col'>
    <h2>Public repositories from user {user}</h2>

    {repo.map((repository) => (
      <div key={repository.id}>{repository.name}</div>
    ))}
  </div>
);

export default PublicRepositories;
