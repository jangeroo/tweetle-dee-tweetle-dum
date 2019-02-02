import React, { Component } from 'react';
import TweetList from './TweetList';
import axios from 'axios';

const users = {
  DONALD: { name: 'Donald Trump', handle: 'realDonaldTrump' },
  HILLARY: { name: 'Hillary Clinton', handle: 'HillaryClinton' },
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: users.DONALD,
      tweets: [],
      loading: true,
    };
    this.fetchTweets = this.fetchTweets.bind(this);
    this.toggleUser = this.toggleUser.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  componentDidMount() {
    this.fetchTweets();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.user !== prevState.user) {
      this.fetchTweets();
    }
  }

  async fetchTweets() {
    const response = await axios.get(`/${this.state.user.handle}`);
    this.setState({ tweets: response.data, loading: false });
  }

  toggleUser() {
    const user =
      this.state.user === users.DONALD ? users.HILLARY : users.DONALD;
    console.log('SWITCHING USER TO ', user);
    this.setState({ user });
  }

  handleButtonClick() {
    this.setState({ loading: true });
    this.toggleUser();
  }

  render() {
    const { loading } = this.state;
    return (
      <div className='App'>
        <h1>Tweetledee-Tweetledum</h1>
        <div>
          <button onClick={this.handleButtonClick}>Switch user</button>
        </div>
        <h2>Here are the latest tweets from {this.state.user.name}</h2>
        <div>
          {loading ? 'Loading...' : <TweetList tweets={this.state.tweets} />}
        </div>
      </div>
    );
  }
}

export default App;
