const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      trim: true,
      lowercase: true,
      match: [
        /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        'Please provide a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [6, 'Password must be at least 6 characters long'],
    },
    role: {
      type: String,
      enum: ['customer', 'admin'],
      default: 'customer',
    },
  
  },
  { timestamps: true }
)

// Create a unique index on the email field
userSchema.index({ email: 1 }, { unique: true })

// Encrypt password before saving to the database
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    next(error)
  }
})

// Compare entered password with the hashed password in the database
userSchema.methods.matchPasswords = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model('User', userSchema)
