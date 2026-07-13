const express = require('express')
const authorRouter = require('./authors.routers')
const bookRouter = require('./books.routers')
const authRouter = require('./auth.routers')
const router = express.Router()
const app = express();
app.use(express.json())

router.use('/authors', authorRouter)
router.use('/books', bookRouter)
router.use('/auth', authRouter)

module.exports = router