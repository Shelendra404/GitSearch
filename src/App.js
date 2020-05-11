import React from 'react';
import './App.css';

/* TO-DO:
- learn to send headers so possible to send api key for authed queries
- learn to page responses when more than x repos
- make more architectured app (not all in one page!!!)
*/

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      username: '',
      userdata: [],
      repos: [],
      showRepos: false,
    };
  }

  handleChangeEvent(props) {
    this.setState({ username: props });
  }

  getUserData(event) {
    event.preventDefault();

    const getUserRepos = async () => {
      try {
        const usersResponse = await fetch(
          `https://api.github.com/users/${this.state.username}`
        );
        const response = await usersResponse.json();

        this.setState({ userdata: response });
        const userRepo = await fetch(response.repos_url);
        const response2 = await userRepo.json();
        this.setState({ repos: response2 });
      } catch (err) {
        console.log('Something went wrong: ' + err);
      }
    };

    getUserRepos();
  }

  showUserRepos = () => {
    this.setState({ showRepos: true });
  };

  getExistingUserInfo(props) {
    return (
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
        <div>
          <button onClick={() => this.showUserRepos()}>Get repos</button>
        </div>
      </div>
    );
  }

  render() {
    let repos = null;

    if (this.state.showRepos) {
      repos = (
        <div className='col'>
          <h2>Public repositories from user {this.state.username}</h2>
          {this.state.repos.map((repo) => (
            <div key={repo.id}>{repo.name}</div>
          ))}
        </div>
      );
    }

    return (
      <div className='App'>
        <form onSubmit={(event) => this.getUserData(event)}>
          <input
            type='text'
            placeholder='Search for a GitHub user'
            onChange={(e) => this.handleChangeEvent(e.target.value)}></input>
          <input type='submit' value='Search'></input>
        </form>
        <div>
          {this.state.userdata.id
            ? this.getExistingUserInfo(this.state.userdata)
            : this.state.userdata.message}
        </div>
        <div>{repos}</div>
      </div>
    );
  }
}

export default App;
