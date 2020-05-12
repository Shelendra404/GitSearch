import React from 'react';

const GetUserInfo = ({ ...props }) => (
  <div className='user-info'>
    <div className='avatar'>
      <img src={props.avatar_url} alt=''></img>
    </div>
    <div className='login-name'>{props.login}</div>
    <div className='user-name'>{props.name}</div>
    <div className='public-repos'>Public repos: {props.public_repos}</div>
    <div className='blog'>
      <a href={props.blog} target='_blank' rel='noopener noreferrer'>
        {props.blog}
      </a>
    </div>
  </div>
);

export default GetUserInfo;
