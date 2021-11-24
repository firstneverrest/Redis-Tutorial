const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/comments', async (req, res) => {
  const postId = req.query.postId;
  const { data } = await axios.get(
    'https://jsonplaceholder.typicode.com/comments',
    { params: { postId } }
  );
  res.status(200).json(data);
});

app.get('/comments/:id', async (req, res) => {
  const id = req.params.id;
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/comments/${id}`,
    { params: { postId } }
  );
  res.status(200).json(data);
});

app.listen(4000, () => console.log('Listening on Port 4000'));
