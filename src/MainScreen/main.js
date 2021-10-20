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

/**get all Products */
ipcMain.handle('get', () => {
    getProducts()
})
const getProducts = async() => {
    const db = await connectDB()
    const products = await db.query('SELECT * FROM products')
    win.webContents.send('products', products)
}

/**Register one product */
ipcMain.handle('add', ( e, obj )=> {
    addProduct( obj )
})

const addProduct = async( product ) => {
    const db = await connectDB()
    const sql = 'INSERT INTO products SET ?'
    await db.query( sql, product )
    getProducts()
}





module.exports = {
    createWindow,
}

