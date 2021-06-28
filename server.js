const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const users = require('./routes/users');
const db = require('./config/keys').mongoURI;

mongoose
  .connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log('MongoDB successfully connected'))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 8000;
const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ success: true });
});

app.use('/api/auth', users);

app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});
