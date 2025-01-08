
const urlParams = new URLSearchParams(window.location.search);
const searchQuery = urlParams.get('query') ? urlParams.get('query').toLowerCase() : '';


fetch('../json folder/fake_store.json')
    .then(response => response.json())
    .then(products => {
        
        const filteredProducts = products.filter(product => 
            product.title.toLowerCase().includes(searchQuery)
        );

        
        displayProducts(filteredProducts);
    })
    .catch(error => console.log('Error fetching products:', error));


function displayProducts(products) {
    const productList = document.getElementById('productList');
    productList.innerHTML = ''; 

    if (products.length === 0) {
        productList.innerHTML = '<h1>No products found.</h1>';
    } else {
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <p>Price: ${product.price} EGP</p>
                <img src="${product.image}" alt="${product.title}" width="100" />
                <p>Name : ${product.title}</p>
            `;
            
            productList.appendChild(productDiv);
        });
    }
}



