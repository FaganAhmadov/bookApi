const express = require('express')
const { register } = require('../controllers/auth.controller')
const authRouter = express.Router()

// authRouter.post('/login',)
authRouter.post('/register', register)
// authRouter.get('/current-user',)
// authRouter.post('/forgot-password',)
// authRouter.post('/reset-password',)
// authRouter.post('/logaut',)

module.exports = authRouter