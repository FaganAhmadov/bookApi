const { v4: uuidv4 } = require('uuid');
const express = require('express')
const app = express();
const readFileUtil = require('../utils/readFile');
const writeFileUtil = require('../utils/writeFile');
const { json } = require('stream/consumers');
app.use(express.json())


const getAllAuthors = (req, res) => {
    const authors = readFileUtil('authors').filter(usr => !usr.isDelete)
    res.status(200).json(authors)
}

const getSingleAuthor = (req, res) => {
    const id = req.params.id;
    const data = readFileUtil()
    const foundAutor = data.authors.find(usr => usr.id === id && !usr.isDelete)
    if (!foundAutor) {
        return res.status(404).json({
            message: 'userNOTFound'
        })
    }
    // author un kitablari
    const books = data.books.filter(book => book.authorId === id && !book.isDelete)
    res.json({
        ...foundAutor,
        books: books
    })
}

const createAuthor = (req, res) => {
    const { fulName, email } = req.body
    if (!fulName || !email) {
        return res.status(400).json({
            message: "fullName or email is valid"
        })
    }
    const newAuthor = {
        id: uuidv4(),
        fulName,
        email,
        isDelete: false
    }
    const data = readFileUtil()
    data.authors.push(newAuthor)
    writeFileUtil(data)
    res.json(newAuthor)
}

const editAuthor = (req, res) => {
    const { fulName, email } = req.body
    const id = req.params.id;
    const data = readFileUtil()
    const foundAutor = data.authors.find(usr => usr.id === id && !usr.isDelete)
    if (!foundAutor) {
        return res.json({
            message: 'autor not found'
        })
    }
    foundAutor.fulName = fulName || foundAutor.fulName
    foundAutor.email = email || foundAutor.email

    writeFileUtil(data)
    res.json(foundAutor)
}

const deleteAuthor = (req, res) => {
    const id = req.params.id;
    const data = readFileUtil()
    const foundAutor = data.authors.find(usr => usr.id === id && !usr.isDelete)
    if (!foundAutor) {
        return res.status(404).json({
            message: 'autor not found'
        })
    }
    foundAutor.isDelete = true
    // author silinende kitablarida silinir 
    const books = data.books.map(book => {
        if (book.authorId === id) {
            book.isDelete = true
        }
    })
    writeFileUtil(data)
    res.status(200).json({
        message: 'user delete orphan'
    })
}

const bookListForAuthor = (req, res) => {
    const id = req.params.id;
    const data = readFileUtil()
    const foundAuthor = data.authors.find(usr => usr.id === id && !usr.isDelete)
    if (!foundAuthor) {
        return res.status(404).json({
            messageL: 'author not found'
        })
    }
    const books = data.books.filter(book => book.authorId === id && !book.isDelete)
    res.json(books)
}

module.exports = {
    getAllAuthors,
    getSingleAuthor,
    createAuthor,
    editAuthor,
    deleteAuthor,
    bookListForAuthor
}