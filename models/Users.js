const crypto = require("crypto");
const mongoose = require("mongoose");
const deepPopulate = require("mongoose-deep-populate")(mongoose);
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { reset } = require("nodemon");

const UserSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "Please add a firstName"],
      unique: true,
    },
    last_name: {
      type: String,
      required: [true, "Please add your lastName"],
      unique: true,
    },
    email: {
      type: String,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please add a valid email",
      ],
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "Please password is required"],
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    followersCount: { type: Number, default: 0 },
    followingCount: { type: Number, default: 0 },
    following: [
      {
        type: Schema.ObjectId,
        ref: "User",
      },
    ],
    followers: [
      {
        type: Schema.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);
//Encrpt password using bcrypt
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Match user to password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash password token
UserSchema.methods.getResetPasswordToken = function () {
  // Generate Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

UserSchema.plugin(deepPopulate);
module.exports = mongoose.model("User", UserSchema);
