require("dotenv").config();
const config = {
    PORT: process.env.PORT,
    origin1: process.env.ORIGIN1,
    origin2: process.env.ORIGIN2,
    origin3: process.env.ORIGIN3,
    origin4: process.env.ORIGIN4,
    node_env :process.env.NODE_ENV,
    jwt_secret: process.env.JWT_SECRET
};

module.exports = config;