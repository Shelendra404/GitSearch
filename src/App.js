import React from 'react';
import './App.css';

/* TO-DO:
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
        const apiUser = process.env.REACT_APP_USER;
        const apiKey = process.env.REACT_APP_TOKEN;

        const usersResponse = await fetch(
          `https://api.github.com/users/${this.state.username}`,
          {
            headers: new Headers({
              Authorization: 'Basic ' + btoa(`${apiUser}:${apiKey}`),
            }),
          }
        );
        const responseUser = await usersResponse.json();

        this.setState({ userdata: responseUser });
        const userRepo = await fetch(responseUser.repos_url);
        const responseRepos = await userRepo.json();
        this.setState({ repos: responseRepos });
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
