const express = require('express')
const app = express();
app.use(express.json())
const { json } = require('stream/consumers');
const router = require('./src/routers');
const readFileUtil = require('./src/utils/readFile');


app.use('/', router)


// getAllData
app.get('/', (req, res) => {
    const allData = readFileUtil()
    res.status(200).json({
        books: allData.books.filter(book => !book.isDelete),
        authors: allData.authors.filter(author => !author.isDelete)
    })
})



app.listen(3000, () => {
    console.log(`Example app listening on port ${3000}`)
})



