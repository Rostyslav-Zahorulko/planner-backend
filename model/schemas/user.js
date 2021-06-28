const { Schema, model } = require('mongoose');
// const bcrypt = require("bcryptjs");
// const SALT_FACTOR = 6;

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,

  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  token: {
    type: String,
    default: null,
  },

  projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
});

// userSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     const salt = await bcrypt.genSalt(SALT_FACTOR);
//     this.password = await bcrypt.hash(this.password, salt);
//   }

//   next();
// });

// userSchema.methods.validPassword = async function (password) {
//   return await bcrypt.compare(String(password), this.password);
// };

const User = model('user', userSchema);

module.exports = User;
