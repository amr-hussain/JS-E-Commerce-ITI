import { add_cookie_object, get_cookie_object } from "../external js/cookies.js";

    
fetch("../json folder/fake_store.json")
    .then((response) => response.json())
    .then((data) => {
        const url_parameters = new URLSearchParams(window.location.search);
        const id = url_parameters.get("id");


        // Find the product by ID
        const product = data.find((item) => item.id == id);
        if (product) {
            display_product(product);
        } else {
            console.error("Product not found!");
        }
    });

function display_product(product) {
    const content = document.getElementById("product_data");

    // Product Card
    const card = document.createElement("div");
    card.className = "product_card";

    // 1) Image
    const image_div = document.createElement("div");
    image_div.className = "image_div";
    const image = document.createElement("img");
    image.className = "product_image";
    image.src = product.image;
    image.alt = "Product Image";
    image_div.appendChild(image);
    
    // 2) The product except image
    const info_div = document.createElement("div");
    info_div.className = 'details_div'
    info_div.id = product.id
    
    // 2.1) Title
    const title = document.createElement("p");
    title.className = "product_title";
    title.textContent = product.title;

    // 2.2) Rating 
    const rating = document.createElement("div");
    rating.className = "product_rating";
    rating.innerHTML = `
        <span style = "font-weight: bold ;">${product.rating.rate}</span>
        <span>${"⭐".repeat(Math.round(product.rating.rate))}</span>
        <span>(${product.rating.count} reviews)</span>
    `;
    // 2.3) Price
    const price = document.createElement("div")
    price.innerHTML = `<p class="product_price">Price: <span class="price">EGP ${product.price}</span></p>`
    
    // 2.4) Category 
    const category = document.createElement("div")
    category.className = "product_category"
    category.textContent = product.category

    // 2.*) A Horizontal line
    let h_line = document.createElement("hr")
    h_line.className = "horizontal_line"

    // 2.5) Add to Cart button
    
    const button = document.createElement("button");
    button.className = "add_to_cart";

    // getting the array of products from cookies
    let products_arr =  get_cookie_object("products_in_cart")

    let n_in_cart = products_arr.filter((x) => x == product.id).length;
    button.textContent = n_in_cart > 0 ? `${n_in_cart} In Cart ✔️` : "Add To Cart 🛒";
    button.style.background = n_in_cart > 0 ? "rgb(6, 139, 6)" : "rgb(43, 62, 119)";
    button.addEventListener("click", () => {
        // change the color of the button whenever I clicket to lime green waiting
        // for the setTimeout to rever the color back whether to green or blue
        button.style.backgroundColor = "limegreen";
        if (products_arr.length < 6) {
            products_arr.push(button.parentElement.id);
            console.log(products_arr)
            add_cookie_object("products_in_cart", products_arr);
            let n_in_cart = products_arr.filter(
            (x) => x == button.parentElement.id
            ).length;
    
            button.textContent = `${n_in_cart} In Cart ✔️`;
    
            // changin the color of the button on click temporarily
            setTimeout(() => {
            button.style.backgroundColor = "rgb(6, 139, 6)";
            }, 300);
        } else {
            setTimeout(() => {
            button.style.backgroundColor = "#227bb7";
            }, 300);
        }
        console.log("clicked");
        });


    // summing up the contents of info_div 
    info_div.appendChild(title)
    info_div.appendChild(h_line.cloneNode())
    info_div.appendChild(rating)
    info_div.appendChild(h_line.cloneNode())
    info_div.appendChild(price)
    info_div.appendChild(h_line.cloneNode())
    info_div.appendChild(category)
    info_div.appendChild(h_line.cloneNode())
    info_div.appendChild(button)
    

    // 3) cart
    const cart = document.createElement("div")
    cart.className = 'cart'
    let goto_cart  = document.createElement("button")
    goto_cart.className = 'goto_cart'
    goto_cart.textContent = "Go To Cart"
    goto_cart.addEventListener("click", ()=>{
        window.open("../cart_page/cart.html");
    });
    cart.appendChild(goto_cart)

    // 3.1) a button to remove product from cart
    let remove_product = document.createElement("button")
    remove_product.classList = 'remove_product'
    remove_product.textContent = "Remove From Cart"
    remove_product.addEventListener("click", () => {
        console.log(product.id)
        products_arr = get_cookie_object("products_in_cart")
        let index = products_arr.indexOf(`${product.id}`);
        console.log(index)
        if (index != -1) {
            products_arr.splice(index, 1); // Removes "banana" 
            n_in_cart = products_arr.filter((x) => x == product.id).length;
            button.textContent = n_in_cart > 0 ? `${n_in_cart} In Cart ✔️` : "Add To Cart 🛒";
            button.style.background = n_in_cart > 0 ? "rgb(6, 139, 6)" : "rgb(43, 62, 119)";
            add_cookie_object("products_in_cart", products_arr)

        }
        add_cookie_object("products_in_cart", products_arr)
        
        
        // changin the color of the button on click temporarily
        remove_product.style.backgroundColor = "rgb(251, 49, 49)";
        setTimeout(() => {
        remove_product.style.backgroundColor = "rgb(216, 0, 0)";
        }, 300);
    });
    cart.appendChild(remove_product)

    // 3.2) Quantity Selector
    const quantity_div = document.createElement("div");
    quantity_div.className = "quantity_selector";
    quantity_div.innerHTML = `
    <label for="quantity">Quantity:</label>
    <input type="number" id="quantity" name="quantity" value="1" min="1">
    `;

    cart.appendChild(quantity_div)

    
    // Append card elements
    card.appendChild(image_div);
    card.appendChild(info_div);
    card.appendChild(cart);



    
    
    // Product Description
    const description = document.createElement("p");
    description.className = "product_description";
    description.innerHTML =`<span class= "desc_word">Description:</span> <span class = "p_desc">  ${product.description}</span>` ;




    content.appendChild(card);
    content.appendChild(description);
    // Updated Image with Zoom


}


