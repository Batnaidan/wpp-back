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
      required: true,
    },
    User_Phone: {
      type: Number,
      required: true,
    },
    User_EmergencyPhone: {
      type: Number,
      required: true,
    },
    User_GoogleId: {
      type: String,
    },
    User_FacebookId: {
      type: String,
    },
    User_Type: {
      type: String,
    },
    User_Office: {
      type: String,
    },
    User_SubOffice: {
      type: String,
    },
    User_BagHoroo: {
      type: String,
    },
    User_Horoolol: {
      type: String,
    },
    User_Hothon: {
      type: String,
    },
    User_Bair: {
      type: String,
    },
    User_Orts: {
      type: String,
    },
    User_Toot: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model('users', UserSchema);
