const mysql = require('promise-mysql')

const connection = mysql.createConnection({
    host: '127.0.0.1',
    database: 'test_db',
    user: 'ricardo',
    password: '5991'
})

function connectDB() {
    return connection
}

module.exports = {
    connectDB
}