import {
  add_cookie_object,
  get_cookie_object
} from "../external js/cookies.js";

fetch('../json folder/fake_store.json')
  .then((response) => response.json())
  .then((json_obj) => {
    show_cart(json_obj);
  })
  .catch((error) => {
    console.error("Error fetching JSON data:", error);
  });

function show_cart(json_obj) {
  let product_ids = get_cookie_object("products_in_cart");
  let groupedProducts = groupProducts(product_ids);

  const cartTableBody = document.querySelector("#cart-table tbody");
  const totalPriceEl = document.getElementById("total-price");
  cartTableBody.innerHTML = ""; 
  let totalPrice = 0;

  groupedProducts.forEach(({
    id,
    quantity
  }) => {
    let product = json_obj.find((p) => p.id == id);
    if (!product) return; 
    const productTotal = product.price * quantity;
    totalPrice += productTotal;

    const row = document.createElement("tr");

    // Product Name
    const nameCell = document.createElement("td");
    nameCell.textContent = product.title;
    // Product Description
    const descriptionCell = document.createElement("td");
    descriptionCell.textContent = product.description.slice(0, 100) + "..."; // Limit to 100 chars

    // Product Rating
    const ratingCell = document.createElement("td");
    ratingCell.innerHTML = `
  <span class="product_stars">${"⭐".repeat(Math.round(product.rating.rate))}</span>
  <span class="product_reviews">(${product.rating.count} reviews)</span>
`;

    // Product Image
    const imageCell = document.createElement("td");
    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.title;
    img.className = "product-image";
    imageCell.appendChild(img);

    // Quantity Controls
    const quantityCell = document.createElement("td");
    const quantityControls = document.createElement("div");
    quantityControls.className = "quantity-controls";

    const decreaseBtn = document.createElement("button");
    decreaseBtn.textContent = "-";
    decreaseBtn.addEventListener("click", () => updateQuantity(id, -1));

    const quantityDisplay = document.createElement("span");
    quantityDisplay.textContent = quantity;

    const increaseBtn = document.createElement("button");
    increaseBtn.textContent = "+";
    increaseBtn.addEventListener("click", () => updateQuantity(id, 1));

    // Remove Product Button
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.className = "remove-product";
    removeBtn.addEventListener("click", () => removeProduct(id));

    quantityControls.appendChild(decreaseBtn);
    quantityControls.appendChild(quantityDisplay);
    quantityControls.appendChild(increaseBtn);
    quantityControls.appendChild(removeBtn); 
    quantityCell.appendChild(quantityControls);

    // Price
    const priceCell = document.createElement("td");
    priceCell.textContent = `${productTotal.toFixed(2)}EGP`;

    // Append cells to the row
    row.appendChild(nameCell);
    row.appendChild(imageCell);
    row.appendChild(quantityCell);
    row.appendChild(priceCell);
    row.appendChild(ratingCell); 
    row.appendChild(descriptionCell); 


    cartTableBody.appendChild(row);
  });

  totalPriceEl.textContent = `Total: EGP${totalPrice.toFixed(2)}`;

  // event listeners to buttons
  document.getElementById("empty-cart").addEventListener("click", emptyCart);
  document.getElementById("proceed-checkout").addEventListener("click", proceedToCheckout);
}

//  product IDs into an array with their quantities
function groupProducts(product_ids) {
  const productCounts = {};
  product_ids.forEach((id) => {
    productCounts[id] = (productCounts[id] || 0) + 1;
  });

  return Object.keys(productCounts).map((id) => ({
    id: parseInt(id),
    quantity: productCounts[id],
  }));
}

function updateQuantity(id, delta) {
  let product_ids = get_cookie_object("products_in_cart");

  // Get the current quantity of the product
  const currentQuantity = product_ids.filter((productId) => productId == id).length;

  if (delta === 1) {
    // Add product to cart
    product_ids.push(id);
  } else if (delta === -1) {
    if (currentQuantity === 1) {
//i couldn't remove the cookie globally so i made a if condition to cath the item when its 1 and i clicked on decrement sign it deletes the entire product
      removeProduct(id);
      return; 
    } else {
      // Remove one instance of the product from the cart
      const index = product_ids.indexOf(id);
      if (index > -1) {
        product_ids.splice(index, 1);
      }
    }
  }

  // Update the cookie globally
  add_cookie_object("products_in_cart", product_ids);

  // Re-render the cart
  fetch('../json folder/fake_store.json')
    .then((response) => response.json())
    .then((json_obj) => {
      show_cart(json_obj);
    })
    .catch((error) => {
      console.error("Error reloading JSON data:", error);
    });
}


function removeProduct(id) {
  let product_ids = get_cookie_object("products_in_cart") ;
  product_ids = product_ids.filter((productId) => productId != id); 
  add_cookie_object("products_in_cart", product_ids); 
  document.cookie = `products_in_cart=${JSON.stringify(product_ids)}; path=/;`;


  fetch('../json folder/fake_store.json')
    .then((response) => response.json())
    .then((json_obj) => {
      show_cart(json_obj);
    })
    .catch((error) => {
      console.error("Error reloading JSON data:", error);
    });
}

function emptyCart() {
  add_cookie_object("products_in_cart", []); 
  show_cart([]); 
}

document.getElementById('proceed-checkout').addEventListener("click",()=>{
  if(get_cookie_object("products_in_cart").length >0){
    location.assign("../checkout/index.html")
  }else{
    alert('Please add Products !')
  }

})