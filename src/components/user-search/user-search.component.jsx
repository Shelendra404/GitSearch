import React from 'react';
import './user-search.styles.scss';

const UserSearch = ({ onSubmit, onChange }) => (
  <div className='user-search'>
    <h1>Search for GitHub users:</h1>
    <form onSubmit={onSubmit}>
      <input
        type='text'
        placeholder='Search for a GitHub user'
        onChange={onChange}></input>
      <input type='submit' value='Search'></input>
    </form>
  </div>
);

export default UserSearch;
