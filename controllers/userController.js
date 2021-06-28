const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const validateRegisterInput = require('../validation/register');
const {
  validateLoginInput,
  validateLoginAuthInput,
} = require('../validation/login');
const { signToken } = require('../validation/validateToken');
const User = require('../models/user');
const { OAuth2Client } = require('google-auth-library');

const CLIENT_ID =
  '191957550253-mv33rqsj53dbkdk92r88a53s5tn04hf4.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

const registerUser = (req, res) => {
  // const { errors, validation } = validateRegisterInput(req.body);

  // if (!validation) return res.status(400).json(errors);

  User.findOne({ User_Email: req.body.email }).then((userInfo) => {
    if (userInfo) {
      return res.status(400).json({ response: 'Email already exists' });
    } else {
      console.log(req.body);
      const newUser = new User({
        User_Email: req.body.formInput.email,
        User_FirstName: req.body.formInput.firstName,
        User_LastName: req.body.formInput.lastName,
        User_Password: req.body.password,
        User_Phone: req.body.formInput.phone,
        User_EmergencyPhone: req.body.formInput.emergencyPhone,
      });
      newUser
        .save()
        .then((success) => {
          console.log(newUser);
          return res.status(201).json(success);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
};

const loginUser = (req, res) => {
  const { errors, validation } = validateLoginInput(req.body);

  if (!validation) return res.status(400).json(errors);

  const { email, password } = req.body;

  User.findOne({ User_Email: email }).then((userInfo) => {
    if (!userInfo) {
      return res.status(404).json({ response: 'Email not found' });
    }
    if (password == userInfo.User_Password) {
      const payload = {
        email: userInfo.User_Email,
        firstName: userInfo.User_FirstName,
        lastName: userInfo.User_LastName,
      };
      const token = signToken(payload, 600);
      let userData = userInfo;
      delete userData.password;
      res.json({
        success: true,
        token: 'Bearer ' + token,
        userData,
      });
    } else {
      return res.status(400).json({ response: 'Password incorrect' });
    }
  });
};

const loginUserByGoogle = async (req, res) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID,
  });
  const { given_name, family_name, email, sub, picture } = ticket.getPayload();

  User.findOne({ User_Email: email }).then((userInfo) => {
    const payload = {
      email: email,
      firstName: given_name,
      lastName: family_name,
    };
    if (userInfo) {
      userInfo.User_FirstName = given_name;
      userInfo.User_LastName = family_name;
      userInfo
        .save()
        .then((success) => {
          console.log(userInfo);
          const token = signToken(payload, 600);
          let userData = userInfo;
          delete userData.password;

          return res.status(204).json({
            success: true,
            token: 'Bearer ' + token,
            userData,
          });
        })
        .catch((err) => {
          return res
            .status(500)
            .json({ response: 'Server failed to update name' });
        });
    } else {
      const newUser = new User({
        User_Email: email,
        User_FirstName: given_name,
        User_LastName: family_name,
        User_GoogleId: sub,
      });

      newUser
        .save()
        .then((success) => {
          console.log(newUser);
          const token = signToken(payload, 600);
          let userData = userInfo;
          delete userData.password;

          return res.status(201).json({
            success: true,
            token: 'Bearer ' + token,
            userData,
          });
        })
        .catch((err) => {
          return res.status(500).json({ response: 'Internal server error' });
        });
    }
  });
};

const loginUserByFacebook = async (req, res) => {
  const { errors, validation } = validateLoginAuthInput(req.body);
  if (!validation) return res.status(400).json(errors);

  const { fullName, email, id, picture } = req.body;
  const [firstName, LastName] = fullName.split(' ');

  User.findOne({ User_Email: email }).then((userInfo) => {
    const payload = {
      email: email,
      firstName: given_name,
      lastName: family_name,
    };
    if (userInfo) {
      userInfo.User_FirstName = firstName;
      userInfo.User_LastName = LastName;
      userInfo
        .save()
        .then((success) => {
          console.log(userInfo);
          const token = signToken(payload, 600);
          let userData = userInfo;
          delete userData.password;
          return res.status(204).json({
            success: true,
            token: 'Bearer ' + token,
            userData,
          });
        })
        .catch((err) => {
          return res
            .status(500)
            .json({ response: 'Server failed to update name' });
        });
    } else {
      const newUser = new User({
        User_Email: email,
        User_FirstName: firstName,
        User_LastName: LastName,
        User_FacebookId: id,
      });

      newUser
        .save()
        .then((success) => {
          console.log(newUser);
          const token = signToken(payload, 600);
          let userData = userInfo;
          delete userData.password;

          return res.status(201).json({
            success: true,
            token: 'Bearer ' + token,
            userData,
          });
        })
        .catch((err) => {
          return res.status(500).json({ response: 'Internal server error' });
        });
    }
  });
};

module.exports = {
  registerUser,
  loginUser,
  loginUserByFacebook,
  loginUserByGoogle,
};
