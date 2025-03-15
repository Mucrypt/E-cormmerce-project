const express = require('express')
const multer = require('multer')
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')

require('dotenv').config()

const router = express.Router()

// Set up cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Set up multer
const storage = multer.memoryStorage()
const upload = multer({ storage })

router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.')
    }

    // Function to handle the stream upload to cloudinary
    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result)
          } else {
            reject(error)
          }
        })

        // Create a readable stream from the file buffer
        streamifier.createReadStream(fileBuffer).pipe(stream)
      })
    }

    // Upload image to cloudinary
    const result = await streamUpload(req.file.buffer)

    // Send the image URL
    res.json({ imageUrl: result.secure_url })
  } catch (error) {
    console.error(error)
    res.status(500).send('Server error')
  }
})

module.exports = router
