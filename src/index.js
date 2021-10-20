const { app } = require('electron')
const { createWindow } = require('./MainScreen/main')

require('./config/connectDB')
require('electron-reload')(__dirname)

app.whenReady().then(() => {
    createWindow()
})
