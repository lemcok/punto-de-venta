const { ipcRenderer } = require('electron')

let mylist;
document.addEventListener('DOMContentLoaded', () => {
    mylist = document.getElementById('mylist')
    renderGetProducts()
})

const renderGetProducts = async() => {
    await ipcRenderer.invoke('get')
}

ipcRenderer.on('products', (e, products) => {
    let template= ''
    const list = products
    list.forEach(element => {
        template+=`
            <tr>
                <th scope="row">${element.id}</th>
                <td>${element.name}</td>
                <td>S/. ${element.price.toFixed(2)}</td>
                <td>${element.description}</td>
            </tr>
        `
    });
    mylist.innerHTML = template
})

/**
 * get values from form inputs
 */
const productForm = document.getElementById('productForm');
const name = document.getElementById('name');
const price = document.getElementById('price');
const description = document.getElementById('description');

productForm.addEventListener('submit', (e) => {
    e.preventDefault();
    renderAddProduct()
})

ipcRenderer.on('product', (event, result) => {
    // idproduct.value = result.id
    name.value = result.name
    price.value = result.price
    price.value = result.description
});
const renderAddProduct = async() => {
    const newProduct = {
        name: name.value,
        price: price.value,
        description: description.value,
    }
    name.value= "";
    price.value= "";
    description.value= "";
    await ipcRenderer.invoke('add', newProduct)
}
