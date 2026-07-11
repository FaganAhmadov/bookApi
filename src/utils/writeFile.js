const fs = require('fs');

// utils köməkçi funksiyalar
const writeFileUtil = (data) => {
    fs.writeFileSync('./db.json', JSON.stringify(data, null, 4))
}

module.exports = writeFileUtil