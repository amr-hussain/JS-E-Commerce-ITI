import { add_cookie, get_cookie } from "../../Tasks/cookies.js";


fetch('products.json')
  .then(response => response.json())
  .then(json_obj => {
    show_cart(json_obj);
  })
  .catch(error => console.error('Error fetching the JSON file:', error));


function show_cart(json_obj) {
  let product_ids = JSON.parse(get_cookie("products_in_cart"));

  console.log(json_obj);
  console.log(product_ids);
  let content = document.getElementById("incart");

  let fargment = document.createDocumentFragment();

  for (let id of product_ids) {
    let product = json_obj.find((p) => p.id == id);
    let max_title = 40;
    let modified_title = product.title;
      if (modified_title.length > max_title) {
        modified_title = modified_title.slice(0, max_title) + "...";
      }

    let card = document.createElement("div");
    card.className = "product_card";
    card.id = id;
    // title of the card
    let title = document.createElement("div");
    title.className = "product_title";
    title.textContent = modified_title;

    //imgae of the card
    let image = document.createElement("img");
    image.className = "product_image";
    image.src = product.image;
    image.alt = "Product Image";

    // rating of the product
    let rating = document.createElement("div");
    rating.className = "product_rating";
    rating.innerHTML = `
      <span class="product_stars">${"⭐".repeat(
      Math.round(product.rating.rate)
    )}</span>
      <span class="product_reviews">(${product.rating.count})</span>
      <span class="product_price">EGP ${product.price}</span>
      `;


    // add to cart button
    let button = document.createElement("button");
    button.className = "add_to_cart";
    button.id = "add_to_cart";
    button.textContent = "🛒";

    // summing up the card components
    card.appendChild(title);
    card.appendChild(image);
    card.appendChild(rating);

    card.appendChild(button);

    //  adding the card to the fargment
    fargment.appendChild(card);
    // adding the fragment to another div to represent the collection of cards specific to a category
    // in order to give the different style from the category heading like using flex

    let category_cards = document.createElement("incart");
    category_cards.className = "category_cards";
    category_cards.appendChild(fargment);
    content.appendChild(category_cards);
  }
}
