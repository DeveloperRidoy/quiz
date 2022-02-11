import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import bcrypt from 'bcrypt';
import { EUserRoles } from '../utils/types/types';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'name is required'],
      maxlength: 30,
    },
    email: {
      type: String,
      required: [true, 'email is required'],
      maxlength: 320,
      index: true,
      unique: true,
      uniqueCaseInsensitive: true,
    },
    password: {
      type: String,
      required: [true, 'password is required'],
      minlength: [6, 'password must be atleast 6 characters'],
      maxlength: [14, 'password can be max 14 characters'], 
      select: false
    },
    passwordChangedAt: Date,
    photo: String, 
    role: {
      type: String, 
      enum: {
        values: [EUserRoles.USER, EUserRoles.ADMIN], 
        message: `role must be either ${EUserRoles.USER} or ${EUserRoles.ADMIN}`
      }, 
      default: EUserRoles.USER
    }
  },
  { timestamps: true }
)

UserSchema.plugin(uniqueValidator, {message: `user with same {PATH} already exists`})

UserSchema.pre('save', function (next) {
  let user = this

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next()

  // generate a salt
  bcrypt.genSalt(15, function (err, salt) {
    if (err) return next(err)

    // hash password using the salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err)
    // replace password with the hashed salt
        user.password = hash; 
        user.passwordChangedAt = new Date(Date.now() - 3000); //minus 3 seconds to avoid authentication issue on first signup
      next()
    })
  })
})

export default mongoose.models.User || mongoose.model('User', UserSchema);