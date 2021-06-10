const express = require('express');
const bodyParser = require('body-parser');
const { OAuth2Client } = require('google-auth-library');
const cors = require('cors');

const PORT = process.env.PORT || 8000;
const CLIENT_ID =
  '191957550253-mv33rqsj53dbkdk92r88a53s5tn04hf4.apps.googleusercontent.com';
// const CLIENT_SECRET = '7BjuNoxtCs2nUhqzJQTn-YdL';

const app = express();
app.use(cors());
const client = new OAuth2Client(CLIENT_ID);

async function verify() {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID,
  });
  const payload = ticket.getPayload();
  const userId = payload('sub');
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ success: true });
});

app.post('/api/auth/google', async (req, res) => {
  console.log('hello');
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID,
  });
  const { name, email, picture, sub } = ticket.getPayload();
  // const user = await db.user.upsert({
  //   where: { email: email },
  //   update: { name, picture },
  //   create: { name, email, picture },
  // });
  res.status(201);
  res.json(ticket);
});

app.post('/api/auth/facebook', async (req, res) => {});

app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});
