const express = require('express')
const app = express();
const router = require('./routers');
const readFileUtil = require('./utils/readFile');
const cors = require('cors')

const allowOrigins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "http://localhost:3003",
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (!allowOrigins.includes(origin)) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true
}))



app.use(express.json());
app.use("/", router);


// getAllData
app.get('/', (req, res) => {
    const allData = readFileUtil()
    res.status(200).json({
        books: allData.books.filter(book => !book.isDelete),
        authors: allData.authors.filter(author => !author.isDelete)
    })
})


module.exports = app

