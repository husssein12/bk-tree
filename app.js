// Obtenemos todos los productos del DOM y los convertimos en un array
const products = Array.from(document.querySelectorAll('.product'));
// Creamos un nuevo árbol BK utilizando la distancia absoluta entre precios
const priceBKTree = new BKTree((a, b) => Math.abs(a - b));

// Insertamos los precios de los productos en el árbol BK
products.forEach(product => {
    const price = parseInt(product.getAttribute('data-price'), 10);
    priceBKTree.insert(price);
});

// Función para agregar un nuevo producto
function addProduct() {
    const imageInput = document.getElementById('imageInput');
    const priceInput = document.getElementById('priceInput');
    const gallery = document.getElementById('gallery');

    const file = imageInput.files[0];
    const price = parseInt(priceInput.value, 10);

    // Validamos que se haya seleccionado una imagen y un precio válido
    if (!file || isNaN(price)) {
        alert("Por favor, sube una imagen y asigna un precio válido.");
        return;
    }

    // Utilizamos FileReader para leer la imagen seleccionada
    const reader = new FileReader();
    reader.onload = function(event) {
        const imgSrc = event.target.result;
        // Creamos un nuevo elemento de producto
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.setAttribute('data-price', price);
        productDiv.innerHTML = `<img src="${imgSrc}" alt="Nuevo Producto"><p class="product-price">$${price}</p>`;

        // Agregamos el nuevo producto a la galería y al árbol BK
        gallery.appendChild(productDiv);
        priceBKTree.insert(price);
        products.push(productDiv);
    };
    reader.readAsDataURL(file); // Leer el contenido de la imagen seleccionada

    // Limpiamos los campos de entrada
    imageInput.value = '';
    priceInput.value = '';
}

// Función para mostrar todos los productos
function showAllProducts() {
    products.forEach(product => {
        product.style.display = 'block'; // Mostramos todos los productos
    });
}

// Función para filtrar productos por rango de precios
function filterProducts(filter) {
    let min, max;
    // Definimos los rangos de precios según el filtro seleccionado
    if (filter === 'cheap') {
        min = 0;
        max = 50;
    } else if (filter === 'medium') {
        min = 51;
        max = 200;
    } else if (filter === 'expensive') {
        min = 201;
        max = 1000;
    }

    // Buscamos los precios filtrados en el árbol BK
    const filteredPrices = priceBKTree.search((min + max) / 2, (max - min) / 2);
    // Mostramos u ocultamos productos según el resultado de la búsqueda
    products.forEach(product => {
        const price = parseInt(product.getAttribute('data-price'), 10);
        if (filteredPrices.includes(price)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Función para buscar productos por nombre
function searchProducts() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    products.forEach(product => {
        // Obtenemos el nombre del producto y lo comparamos con la búsqueda
        const productName = product.querySelector('.product-price').innerText.toLowerCase();
        if (productName.includes(searchInput)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}
