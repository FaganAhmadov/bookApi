const express = require('express')
const { getAllBooks, getSingleBooks, createBook, editBook, deleteBook } = require('../controllers/books.controller')
const bookRouter = express.Router()

bookRouter.get('/', getAllBooks)
bookRouter.get('/:id', getSingleBooks)
bookRouter.post('/',createBook)
bookRouter.put('/:id',editBook)
bookRouter.delete('/:id',deleteBook)

module.exports = bookRouter