const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    User_Email: {
      type: String,
      required: true,
    },
    User_FirstName: {
      type: String,
      required: true,
    },
    User_LastName: {
      type: String,
      required: true,
    },
    User_Password: {
      type: String,
    },
    User_Bio: {
      type: String,
    },
    User_Phone: {
      type: String,
    },
    User_GoogleId: {
      type: String,
    },
    User_FacebookId: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model('users', UserSchema);
