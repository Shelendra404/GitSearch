import React from 'react';
import UserSearch from './components/user-search/user-search.component';
import PublicRepositories from './components/public-repositories/public-repositories.component';
import GetUserInfo from './components/get-user-info/get-user-info.component';
import RepositoryCommits from './components/repository-commits/repository-commits.components';
import PaginationButtons from './components/pagination-buttons/pagination-buttons.component';
import './App.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      username: '',
      userdata: [],
      repos: [],
      showRepos: false,
      commits: [],
      lastRepo: '',
      page: '1',
      headerLink: '',
      first: '',
      prev: '',
      next: '',
      last: '',
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

  getHeaders() {
    return new Headers({
      Authorization:
        'Basic ' +
        btoa(`${this.getCredentials('user')}:${this.getCredentials('key')}`),
    });
  }

  showUserRepos = () => {
    this.setState({ showRepos: true });
    this.getRepos();
  };

  getDate(date) {
    let ParsedDate = new Date(date);
    ParsedDate =
      ParsedDate.getDate() +
      '.' +
      (ParsedDate.getMonth() + 1) +
      '.' +
      ParsedDate.getFullYear();
    return ParsedDate;
  }

  getUserData(event) {
    event.preventDefault();
    // Set everything back to original state

    const getUser = async () => {
      try {
        await this.setState({ showRepos: false });
        await this.setState({ repos: [] });
        await this.setState({ commits: [] });
        const users = await fetch(
          `https://api.github.com/users/${this.state.username}`,
          {
            headers: this.getHeaders(),
          }
        );
        const userData = await users.json();
        this.setState({ userdata: userData });
      } catch (err) {
        console.log('Something went wrong while searching for the user.');
      }
    };

    getUser();
  }

  getRepos = () => {
    const getRepositories = async () => {
      try {
        const userRepos = await fetch(
          this.state.userdata.repos_url + '?per_page=2&page=' + this.state.page,
          {
            headers: this.getHeaders(),
          }
        );
        await this.setState({ headerLink: userRepos.headers.get('Link') });

        const repoData = await userRepos.json();
        await this.setState({ repos: repoData });
        await this.setRepoPageState();
      } catch (err) {
        console.log('Something went wrong while fetching the repositories.');
      }
    };

    getRepositories();
  };

  getCommits = (props) => {
    this.setState({ lastRepo: props });
    const getUserCommits = async () => {
      try {
        const commits = await fetch(
          `https://api.github.com/repos/${this.state.userdata.login}/${props}/commits?per_page=10`,
          {
            headers: this.getHeaders(),
          }
        );

        const commitData = await commits.json();
        this.setState({ commits: commitData });
      } catch (err) {
        console.log('Something went wrong while fetching the commits.');
      }
    };

    getUserCommits();
  };

  setRepoPageState() {
    this.setState({ first: '', last: '', next: '', prev: '' });
    let data = this.state.headerLink;
    let parse = require('parse-link-header');
    let parsedData = parse(data);

    Object.keys(parsedData).map((key) =>
      this.setState({ [key]: parsedData[`${key}`]['page'] })
    );
  }

  dynamicFetchRepos(props) {
    let data = this.state.headerLink;
    let parse = require('parse-link-header');
    let parsedData = parse(data);

    let page = parsedData[`${props}`]['page'];

    const repoFetch = async () => {
      try {
        await this.setState({ page: page });
        await this.getRepos();
      } catch (err) {
        console.log('Something went wrong');
      }
    };
    repoFetch();
  }

  getExistingUserInfo(props) {
    return (
      <GetUserInfo
        avatar_url={props.avatar_url}
        login={props.login}
        name={props.name}
        public_repos={props.public_repos}
        blog={props.blog}
        created={this.getDate(props.created_at)}
        onClick={() => this.showUserRepos()}></GetUserInfo>
    );
  }

  render() {
    let repos = null;
    let commits = null;

    if (this.state.showRepos) {
      repos = (
        <div>
          <PublicRepositories
            user={this.state.username}
            repo={this.state.repos}
            onClick={(props) => this.getCommits(props)}></PublicRepositories>
          <PaginationButtons
            onClick={(props) => this.dynamicFetchRepos(props)}
            values={[
              [this.state.first ? 'first' : ''],
              [this.state.prev ? 'prev' : ''],
              [this.state.next ? 'next' : ''],
              [this.state.last ? 'last' : ''],
            ]}>
            {PaginationButtons.children}
          </PaginationButtons>
        </div>
      );
    }

    if (this.state.commits.length !== 0) {
      commits = (
        <RepositoryCommits
          data={this.state.commits}
          getDate={(props) => this.getDate(props)}
          lastRepo={this.state.lastRepo}
        />
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
          {commits}
        </div>
      </div>
    );
  }
}

export default App;
