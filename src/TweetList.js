import React, { Component } from 'react';
import Tweet from 'react-tweet';

export default class TweetList extends Component {
  render() {
    return (
      <div>
        {this.props.tweets.map(tweetData => (
          <Tweet key={tweetData.id_str} data={tweetData} />
        ))}
      </div>
    );
  }
}
