import React from 'react';
import UserSearch from './components/user-search/user-search.component';
//import PublicRepositories from './components/public-repositories/public-repositories.component';
import GetUserInfo from './components/get-user-info/get-user-info.component';
import './App.css';

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

  getCredentials(props) {
    const apiUser = process.env.REACT_APP_USER;
    const apiKey = process.env.REACT_APP_TOKEN;

    if (props === 'user') {
      return apiUser;
    } else if (props === 'key') {
      return apiKey;
    }
  }

  getUserData(event) {
    event.preventDefault();

    const getUserRepos = async () => {
      try {
        const users = await fetch(
          `https://api.github.com/users/${this.state.username}`,
          {
            headers: new Headers({
              Authorization:
                'Basic ' +
                btoa(
                  `${this.getCredentials('user')}:${this.getCredentials('key')}`
                ),
            }),
          }
        );
        const userData = await users.json();
        this.setState({ userdata: userData });
        const userRepos = await fetch(userData.repos_url, {
          headers: new Headers({
            Authorization:
              'Basic ' +
              btoa(
                `${this.getCredentials('user')}:${this.getCredentials('key')}`
              ),
          }),
        });
        const repoData = await userRepos.json();

        this.setState({ repos: repoData });
      } catch (err) {
        console.log('Something went wrong: ' + err);
      }
    };

    getUserRepos();
  }

  getCommits = (props) => {
    console.log('You clicked on Show Commits from ' + props);
    const getUserCommits = async () => {
      try {
        const commits = await fetch(
          `https://api.github.com/repos/${this.state.userdata.login}/${props}/commits`,
          {
            headers: new Headers({
              Authorization:
                'Basic ' +
                btoa(
                  `${this.getCredentials('user')}:${this.getCredentials('key')}`
                ),
            }),
          }
        );
        const commitData = await commits.json();
        console.log(commitData);
      } catch (err) {
        console.log('Something went wrong while fetching the commits.');
      }
    };

    getUserCommits();
  };

  showUserRepos = () => {
    this.setState({ showRepos: true });
  };

  getExistingUserInfo(props) {
    return (
      <GetUserInfo
        avatar_url={props.avatar_url}
        login={props.login}
        name={props.name}
        public_repos={props.public_repos}
        blog={props.blog}
        onClick={() => this.showUserRepos()}></GetUserInfo>
    );
  }

  render() {
    let repos = null;

    if (this.state.showRepos) {
      repos = (
        <div className='public-repositories'>
          <h2>Public repositories from user {this.state.username}</h2>

          {this.state.repos.map((repository) => (
            <div key={repository.id}>
              <a
                href={repository.html_url}
                target='_blank'
                rel='noreferrer noopener'>
                {repository.name}
              </a>
              <button onClick={() => this.getCommits(repository.name)}>
                Get Commits
              </button>
              <br />
            </div>
          ))}
        </div>
        //   <PublicRepositories
        //     user={this.state.username}
        //     repo={this.state.repos}></PublicRepositories>
      );
    }

    return (
      <div className='App'>
        <UserSearch
          onSubmit={(event) => this.getUserData(event)}
          onChange={(e) => this.handleChangeEvent(e.target.value)}
        />

        <div className='results'>
          {this.state.userdata.id
            ? this.getExistingUserInfo(this.state.userdata)
            : this.state.userdata.message}
          {repos}
        </div>
      </div>
    );
  }
}

export default App;
