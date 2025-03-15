const express = require('express')
const Subscriber = require('../models/Subscriber')

const router = express.Router()

// Subscribe to newsletter
router.post('/subscribe', async (req, res) => {
  const { email } = req.body

  if (!email) {
    return res.status(400).json({ msg: 'Please enter your email' })
  }

  try {
    // Check if subscriber already exists
    let subscriber = await Subscriber.findOne({ email })

    if (subscriber) {
      return res.status(400).json({ msg: 'You are already subscribed' })
    }

    subscriber = new Subscriber({
      email,
    })

    await subscriber.save()

    res.json({ msg: 'You have successfully subscribed' })
  } catch (error) {
    console.error(error)
    res.status(500).send('Server error')
  }
})

module.exports = router
