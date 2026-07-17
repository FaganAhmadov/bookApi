const { v4: uuidv4 } = require('uuid');
const readFileUtil = require('../utils/readFile');
const writeFileUtil = require('../utils/writeFile');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');
const register = async (req, res) => {
    try {
        const { fullName, email, password, role } = req.body
        if (role !== 'author') {
            return res.status(400).json({
                message: 'badRequest'
            })
        }
        const users = readFileUtil('users')
        const userExist = users.find(usr => usr.email === email)
        if (userExist) {
            return res.status(400).json({
                message: 'already User'
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

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const users = readFileUtil('users')
        const foundUser = users.find(usr => usr.email === email)
        
        if (!foundUser) {
            return res.status(400).json({
                message: 'userNotFound'
            })
        }
        const conifirmPassword = await bcrypt.compare(password, foundUser.password)
        if (!conifirmPassword) {
            res.status(400).json({
                message: 'password is incorrect'
            })
        }
        // token yaradir 
        const accesToken = jwt.sign(
            {
                id: foundUser.id
            },
            config.jwt_secret,
            { expiresIn: '1h' });
        // cookie ye yazdirir
        res.cookie('accesToken', accesToken, {
            maxAge: 60 * 60 * 1000, // 1 hour,
            httpOnly: true,
            secure: false, // Set to true if using HTTPS
            sameSite: 'strict' // Adjust based on your requirements
        })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports = {
    register,
    login
}
