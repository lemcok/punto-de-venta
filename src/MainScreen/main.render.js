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
                <td>
                    <button 
                        class="btn btn-info"
                        id="btnEdit"
                        value="${element.id}"
                    >
                        Edit
                    </button>
                </td>
                <td>
                    <button 
                        class="btn btn-danger"
                        value="${element.id}"
                    >
                        Delete
                    </button>
                </td>
            </tr>
        `
        
    });
    mylist.innerHTML = template

    const btnEdit = document.querySelectorAll(".btn-info")
    btnEdit.forEach( btn => {
        btn.addEventListener('click', renderGetOneProduct)
    } )
})

/** Register Product */
const productForm = document.getElementById('productForm');
const name = document.getElementById('name');
const price = document.getElementById('price');
const description = document.getElementById('description');

//---fn limpiar Inputs
const clearInputs = () => {
    idProduct.value =""
    name.value = ""
    price.value = ""
    description.value = ""
}

productForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if( name.value === '') return;
    
    if (idProduct.value.length > 0) {
        renderUpdateProduct()
        clearInputs()
    }else {
        renderAddProduct()
        clearInputs()
    }

})

const renderAddProduct = async() => {
    const newProduct = {
        name: name.value,
        price: price.value,
        description: description.value,
    }
    await ipcRenderer.invoke('addProduct', newProduct)
}


/**  Get one product*/
const idProduct = document.getElementById('idProduct'); 
ipcRenderer.on('product', (event, result) => {
    idProduct.value = result.id
    name.value = result.name
    price.value = result.price
    description.value = result.description
});
const renderGetOneProduct = async(e) => {
    const idProduct = e.target.value
    await ipcRenderer.invoke('get_one', idProduct)
}

/**Update Product */

const renderUpdateProduct = async() => {
    const newProduct = {
        id: idProduct.value,
        name: name.value,
        price: price.value,
        description: description.value,
    }
    await ipcRenderer.invoke('updateProduct', newProduct)
}


