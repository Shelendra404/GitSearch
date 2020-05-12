import React from 'react';
import './public-repositories.styles.scss';

const PublicRepositories = ({ user, repo }) => (
  <div className='public-repositories'>
    <h2>Public repositories from user {user}</h2>

    {repo.map((repository) => (
      <div key={repository.id}>
        <a href={repository.html_url} target='_blank' rel='noreferrer noopener'>
          {repository.name}
        </a>
        <button>Get Commits</button>
        <br />
      </div>
    ))}
  </div>
);

export default PublicRepositories;

// fetch(`https://api.github.com/repos/${user}/${repository.name}/commits`)
// .then((response) => response.json())
// .then((data) => console.log(data)),

// <div key={repository.id}>
// <a href={repository.html_url} target='_blank' rel='noreferrer noopener'>
//   {repository.name}
// </a>
// <button>Get Commits</button>
// <br />
// </div>
