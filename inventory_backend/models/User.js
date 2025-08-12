const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // For real apps, hash passwords!
  role: { type: String, enum: ['doctor', 'pharmacy','admin'], required: true },
});

module.exports = mongoose.model('HUser', UserSchema);
