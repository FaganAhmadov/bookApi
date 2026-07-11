const express = require('express')
const app = express();
const { v4: uuidv4 } = require('uuid');
const { json } = require('stream/consumers');
const readFileUtil = require('../utils/readFile');
const writeFileUtil = require('../utils/writeFile');
app.use(express.json())

const getAllBooks = ('/books', (req, res) => {
    const books = readFileUtil('books').filter(usr => !usr.isDelete)
    res.status(200).json(books)
})

const getSingleBooks = (req, res) => {
    const { authorId, title, description } = req.body
    const data = readFileUtil()
    const foundAuthor = data.authors.find(usr => usr.id === authorId && !usr.isDelete)
    if (!foundAuthor) {
        return res.status(404).json({
            message: 'Author not found'
        })
    }
    if (!authorId || !title || !description) {
        return res.status(400).json({
            message: "authorId description  title is valid"
        })
    }
    const newBook = {
        id: uuidv4(),
        authorId,
        title,
        description,
        isDelete: false,
    }
    data.books.push(newBook)
    writeFileUtil(data)
    res.json(newBook)
}

const createBook = (req, res) => {
    const { authorId, title, description } = req.body
    const data = readFileUtil()
    const foundAuthor = data.authors.find(usr => usr.id === authorId && !usr.isDelete)
    if (!foundAuthor) {
        return res.status(404).json({
            message: 'Author not found'
        })
    }
    if (!authorId || !title || !description) {
        return res.status(400).json({
            message: "authorId description  title is valid"
        })
    }
    const newBook = {
        id: uuidv4(),
        authorId,
        title,
        description,
        isDelete: false,
    }
    data.books.push(newBook)
    writeFileUtil(data)
    res.json(newBook)
}

const editBook = (req, res) => {
    const id = req.params.id;
    const { authorId, title, description } = req.body
    const data = readFileUtil()
    const foundBook = data.books.find(book => book.id === id && !book.isDelete)
    if (!foundBook) {
        return res.status(404).json({
            message: 'book not found'
        })
    }

    foundBook.title = title || foundBook.title
    foundBook.authorId = authorId || foundBook.authorId
    foundBook.description = description || foundBook.description
    writeFileUtil(data)
    res.json(foundBook)

}

const deleteBook = (req, res) => {
    const id = req.params.id
    const data = readFileUtil()
    const foundBook = data.books.find(book => book.id && !book.isDelete)
    if (!foundBook) {
        res.status(404).json({
            message: 'book not Found'
        })
    }
    foundBook.isDelete = true
    writeFileUtil(data)
    res.status(200).json({
        message: "delete is successFully"
    })
}

module.exports = {
    getAllBooks,
    getSingleBooks,
    createBook,
    editBook,
    deleteBook,
}