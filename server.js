const express = require('express');
const app = express();

const Twitter = require('twitter');

const client = new Twitter({
  // TODO: Find a way to fetch credentials in order to not commit them to the repo, which is totally unsecure
  consumer_key: 'z4idmKf8ZsaGf3htDtE8MaMp6',
  consumer_secret: 'e8AttypXn2rBu7nY3ij8Bvfmp5trM36xCf6xQjNf7TTwh0d5Xz',
  bearer_token:
    'AAAAAAAAAAAAAAAAAAAAACCv9QAAAAAAx%2FUnWLZDOVnH%2Bw3Wvx2dCZnp2jI%3DjKrC2IgTaxqre3pns8ezNkJQUhqQq5fBbSMq6nvaQmdmPsQFmH',
});

app.get('/:user', (req, res, next) => {
  client
    .get('https://api.twitter.com/1.1/search/tweets.json', {
      q: `from:${req.params.user}`,
    })
    .then(tweets => {
      res.send(tweets.statuses);
    })
    .catch(error => {
      throw error;
    });
});

const port = 4001;
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
