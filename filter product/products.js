import { add_cookie_object, get_cookie_object } from "../external js/cookies.js";

let json_obj = null;
document.getElementById('products_in_cart').textContent=get_cookie_object("products_in_cart").length || 0;
// Fetch the products from the JSON file
async function fetchProducts() {
    try {
        const response = await fetch('../json folder/fake_store.json'); // تعديل المسار إذا كان ملف JSON في مكان آخر
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}

// Initialize cart and display product count
function initialize_cart() {
    let products_in_cart = document.getElementById("products_in_cart");

    let storage = get_cookie_object("products_in_cart");
    if (storage == undefined) {
        add_cookie_object("products_in_cart", []);
    }

    products_in_cart.textContent = get_cookie_object("products_in_cart").length;

    return products_in_cart;
}

// Render the products on the page
function renderProducts(products) {
    const container = document.getElementById('products-container');
    container.innerHTML = ''; // مسح المحتوى الحالي
    if (products.length === 0) {
        container.innerHTML = '<p>No products found for this category.</p>';
        return;
    }

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product_card');
        productElement.id = product.id;

        // Product Image
        let image_div = document.createElement("div");
        image_div.className = "image_div";
        let image = document.createElement("img");
        image.className = "product_image";
        image.src = product.image;
        image.alt = "Product Image";
        image_div.appendChild(image);

        // Product Rating and Price
        let rating = document.createElement("div");
        rating.className = "product_rating";
        rating.innerHTML = `
            <span class="product_stars">${"⭐".repeat(Math.round(product.rating.rate))}</span>
            <span class="product_reviews">(${product.rating.count})</span>
            <span class="product_price">EGP ${product.price}</span>
        `;

        // Add to Cart Button
        let button = document.createElement("button");
        button.className = "add_to_cart";
        let storage = get_cookie_object("products_in_cart");
        let n_in_cart = storage.filter((x) => x == product.id).length;

     
            button.textContent = "Add To Cart 🛒";
        

        // Add the button functionality
        button.addEventListener("click", function () {
            let pro=localStorage.getItem('current_user')
            
            if(pro){
            button.style.backgroundColor = "limegreen";
            let storage=get_cookie_object("products_in_cart")
            storage.push(parseInt(product.id));
            add_cookie_object("products_in_cart", storage);
            products_in_cart.textContent = storage.length;

            let n_in_cart = storage.filter(x => x == product.id).length;
            button.textContent = `${n_in_cart} In Cart ✔️`;

            setTimeout(() => {
                button.style.backgroundColor = "rgb(6, 139, 6)";
            }, 300);}else{alert('login first')}
        });

        // Append elements to product
        productElement.appendChild(image_div);
        productElement.appendChild(rating);
        productElement.appendChild(button);

        // Add the product card to the container
        container.appendChild(productElement);
    });
}

// Filter the products by category
function filterProducts(category, products) {
    if (category === 'all') {
        return products;
    }
    return products.filter(product => product.category === category);
}

// Main function to load and display products
(async function initializePage() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category') || 'all'; 
    const products = await fetchProducts();
    const filteredProducts = filterProducts(category, products);
    renderProducts(filteredProducts);
})();

