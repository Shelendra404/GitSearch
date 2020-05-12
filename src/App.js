import React from 'react';
import UserSearch from './components/user-search/user-search.component';
import PublicRepositories from './components/public-repositories/public-repositories.component';
import GetUserInfo from './components/get-user-info/get-user-info.component';
import './App.css';

/* TO-DO:
- learn to page responses when more than x repos
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
      <div>
        <GetUserInfo
          avatar_url={props.avatar_url}
          login={props.login}
          name={props.name}
          public_repos={props.public_repos}
          blog={props.blog}></GetUserInfo>

        <button onClick={() => this.showUserRepos()}>Get repos</button>
      </div>
    );
  }

  render() {
    let repos = null;

    if (this.state.showRepos) {
      repos = (
        <PublicRepositories
          user={this.state.username}
          repo={this.state.repos}></PublicRepositories>
      );
    }

    return (
      <div className='App'>
        <UserSearch
          onSubmit={(event) => this.getUserData(event)}
          onChange={(e) => this.handleChangeEvent(e.target.value)}
        />

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
