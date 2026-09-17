const mongoose = require('mongoose');
const Schema = mongoose.Scheme;

const userSchema = new mongoose.Schema({
  email:        { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true },

  // settings
  weeklyAllowance: { type: Number, default: 0 },   // cents
  weekStartsOn:    { type: Number, default: 1 },    // 0 = Sun, 1 = Mon
  timezone:        { type: String, default: 'America/Los_Angeles' },
  rolloverMode:    { type: String, enum: ['reserve', 'carry', 'discard'], default: 'reserve' },

  reserveCash: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model("User", userSchema);