const express = require('express')
const authorRouter = require('./authors.routers')
const bookRouter = require('./books.routers')
const router = express.Router()

router.use('/authors', authorRouter)
router.use('/books', bookRouter)

module.exports = router