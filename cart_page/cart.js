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

// Function to render the cart table
function show_cart(json_obj) {
  let product_ids = get_cookie_object("products_in_cart") || [];
  let groupedProducts = groupProducts(product_ids);

  const cartTableBody = document.querySelector("#cart-table tbody");
  const totalPriceEl = document.getElementById("total-price");
  cartTableBody.innerHTML = ""; // Clear table
  let totalPrice = 0;

  groupedProducts.forEach(({
    id,
    quantity
  }) => {
    let product = json_obj.find((p) => p.id == id);
    if (!product) return; // Skip if product not found

    // Calculate total price for the product
    const productTotal = product.price * quantity;
    totalPrice += productTotal;

    // Create table row
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
    quantityControls.appendChild(removeBtn); // Add Remove button here
    quantityCell.appendChild(quantityControls);

    // Price
    const priceCell = document.createElement("td");
    priceCell.textContent = `EGP ${productTotal.toFixed(2)}`;

    // Append cells to the row
    row.appendChild(nameCell);
    row.appendChild(imageCell);
    row.appendChild(quantityCell);
    row.appendChild(priceCell);
    row.appendChild(ratingCell); // Add Rating Cell
    row.appendChild(descriptionCell); // Add Description Cell


    // Append row to the table
    cartTableBody.appendChild(row);
  });

  // Update total price
  totalPriceEl.textContent = `Total: EGP${totalPrice.toFixed(2)}`;

  // Add event listeners to buttons
  document.getElementById("empty-cart").addEventListener("click", emptyCart);
  document.getElementById("proceed-checkout").addEventListener("click", proceedToCheckout);
}

// Group product IDs into an array with their quantities
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

// Update quantity in the cart
function updateQuantity(id, delta) {
  let product_ids = get_cookie_object("products_in_cart") || [];
  if (delta === 1) {
    // Add product to cart
    product_ids.push(id);
  } else if (delta === -1) {
    // Remove one instance of the product from cart
    const index = product_ids.indexOf(id);
    if (index > -1) {
      product_ids.splice(index, 1);
    }
  }

  // Update the cookie with the new cart data
  add_cookie_object("products_in_cart", product_ids);

  // Re-fetch the JSON and re-render the cart
  fetch('../json folder/fake_store.json')
    .then((response) => response.json())
    .then((json_obj) => {
      show_cart(json_obj); // Re-render the cart
    })
    .catch((error) => {
      console.error("Error reloading JSON data:", error);
    });
}

// Remove a product entirely from the cart
function removeProduct(id) {
  let product_ids = get_cookie_object("products_in_cart") || [];
  product_ids = product_ids.filter((productId) => productId != id); // Remove all instances of the product
  add_cookie_object("products_in_cart", product_ids); // Update the cookie

  // Re-fetch the JSON and re-render the cart
  fetch('../json folder/fake_store.json')
    .then((response) => response.json())
    .then((json_obj) => {
      show_cart(json_obj); // Re-render the cart
    })
    .catch((error) => {
      console.error("Error reloading JSON data:", error);
    });
}

// Empty the cart
function emptyCart() {
  add_cookie_object("products_in_cart", []); // Clear the cart cookie
  show_cart([]); // Clear the table
}

// Proceed to checkout
function proceedToCheckout() {
  window.location.href = "checkout.html"; // Redirect to the checkout page
}