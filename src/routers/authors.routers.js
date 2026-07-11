const { getAllAuthors, getSingleAuthor, createAuthor, editAuthor, deleteAuthor,  bookListForAuthor } = require('../controllers/authors.controller')
const express = require('express')
const authorRouter = express.Router()

authorRouter.get('/', getAllAuthors)
authorRouter.get('/:id', getSingleAuthor)
authorRouter.get('/:id', createAuthor)
authorRouter.put('/:id', editAuthor)
authorRouter.delete('/:id', deleteAuthor)
authorRouter.get('/:id/books', bookListForAuthor)

module.exports = authorRouter