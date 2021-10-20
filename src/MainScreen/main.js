const { app, BrowserWindow, ipcMain } = require('electron');
// const path = require('path'); 
const { connectDB } = require('../config/connectDB');

let win;
function createWindow () {
    win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true,
        // devTools:false,
        // preload:path.join(app.getAppPath(), 'src/MainScreen/main.js')
       }
    })
    win.loadFile('src/MainScreen/main.html')
} 

ipcMain.handle('get', () => {
    getProducts()
})
const getProducts = async() => {
    const db = await connectDB()
    const products = await db.query('SELECT * FROM products')
    win.webContents.send('products', products)
}



module.exports = {
    createWindow,
}

