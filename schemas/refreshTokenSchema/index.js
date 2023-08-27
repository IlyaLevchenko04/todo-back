const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const refreshTokenSchema = new Schema(
  {
    tokenId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema);

module.exports = { RefreshToken };
