const fs = require('fs');
// utils köməkçi funksiyalar
const readFileUtil = (dbname) => {
    const data = JSON.parse(fs.readFileSync('./db.json', 'utf-8'))
    return dbname ? data[dbname] : data
}
module.exports = readFileUtil