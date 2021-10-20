const { app, BrowserWindow, ipcMain } = require('electron');
// const path = require('path'); 
const { connectDB } = require('../config/connectDB');

let win;
function createWindow () {
    win = new BrowserWindow({
      width: 920,
      height: 650,
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

/** Get all Products */
ipcMain.handle('get', () => {
    getProducts()
})
const getProducts = async() => {
    const db = await connectDB()
    const products = await db.query('SELECT * FROM products')
    win.webContents.send('products', products)
}

/** Get One Product */
ipcMain.handle('get_one', (e, idproduct) => {
    getOneProduct(idproduct)    
});
const getOneProduct = async(id = 2) => {
    const db = await connectDB()
    let sql = "SELECT * FROM products WHERE id = ?"
    const product = await db.query( sql, id )
    win.webContents.send('product', product[0])
}

/** Register one product */
ipcMain.handle('addProduct', ( e, obj )=> {
    addProduct( obj )
})
const addProduct = async( product ) => {
    const db = await connectDB()
    const sql = 'INSERT INTO products SET ?'
    await db.query( sql, product )
    getProducts()
}

/** Update one product */
ipcMain.handle('updateProduct', (event, obj) => {
    updateProduct(obj)    
});
const updateProduct = async( product ) => {
    const { id, name, price, description } = product;
    const db = await connectDB()
    const sql = 'UPDATE products SET name=?, price=?, description=? WHERE id=?'
    await db.query( sql, [name, price, description, id] )
    getProducts()
}

/** Delete Product */
ipcMain.handle('delete_product', (event, id) => {
    deleteProduct(id)
  });

const deleteProduct = async(id) => {
    const db = await connectDB()
    const sql = 'DELETE FROM products WHERE id = ?'
    await db.query( sql, id )
    getProducts()
}



module.exports = {
    createWindow,
}

