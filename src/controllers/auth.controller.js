const { v4: uuidv4 } = require('uuid');
const readFileUtil = require('../utils/readFile');
const writeFileUtil = require('../utils/writeFile');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    try {
        const { fullName, email, password, role } = req.body
        if (role !== 'author') {
            return res.status(400).json({
                message: 'badRequest'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            id: uuidv4(),
            fullName: fullName,
            email,
            password: hashedPassword,
            isDelete: false,
            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6g1k7r3J8X2Z4j5nYqzW8FfG1x3y',
            role,
            createAt: new Date()
        }
        const data = readFileUtil()
        data.users.push(newUser)

        const newAuthor = {
            id: uuidv4(),
            userID: newUser.id,
            books: []
        }
        data.authors.push(newAuthor)
        writeFileUtil(data)
        res.status(201).json({
            message: 'User registered successfully',
            user: newUser
        })

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


module.exports = {
    register
}
