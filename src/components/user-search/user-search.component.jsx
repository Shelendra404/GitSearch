import React from 'react';

const UserSearch = ({ onSubmit, onChange }) => (
  <div>
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
