const express = require('express');
const axios = require('axios');
const cors = require('cors');
const Redis = require('redis');

const DEFAULT_EXPIRATION = 3600;

// connect to redis
const redisClient = Redis.createClient();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/comments', async (req, res) => {
  const postId = req.query.postId;
  const comments = await getOrSetCache(
    `comments?postId=${postId}`,
    async () => {
      const { data } = await axios.get(
        'https://jsonplaceholder.typicode.com/comments',
        { params: { postId } }
      );
      return data;
    }
  );
  res.status(200).json(comments);
});

app.get('/comments/:id', async (req, res) => {
  const id = req.params.id;
  const comment = await getOrSetCache(`comments:${id}`, async () => {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/comments/${id}`
    );
    return data;
  });
  res.status(200).json(comment);
});

const getOrSetCache = (key, callback) => {
  return new Promise((resolve, reject) => {
    redisClient.get(key, async (error, data) => {
      if (error) return reject(error);
      if (data != null) return resolve(JSON.parse(data));
      const freshData = await callback();
      redisClient.setex(key, DEFAULT_EXPIRATION, JSON.stringify(freshData));
      resolve(freshData);
    });
  });
};

app.listen(4000, () => console.log('Listening on Port 4000'));
