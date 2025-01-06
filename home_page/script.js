import { add_cookie, get_cookie } from "../external js/cookies.js";

// /////// fakestoreapi.com/products
// let json_obj = null;
// let request = new XMLHttpRequest();
// request.onreadystatechange = function () {

//   console.log(`ready state = ${request.readyState}`);

//   if (request.readyState === 4 && request.status === 200) {
//     json_obj = request.responseText;
//     json_obj = JSON.parse(json_obj);
//     work_on_data(json_obj);
//     main();
//     // cart_page();
//   }

// };

// request.open("GET", "https://fakestoreapi.com/products", true);
// request.send();

// ////////

let json_obj = null;

fetch("../json folder/fake_store.json")
  .then((response) => response.json())
  .then((data) => {
    json_obj = data;
    let products_in_cart = initialize_cart(); // products_in_cart is the element showing the number of things in cart currently
    work_on_data(json_obj);
    cart_event(products_in_cart);
    product_event();
    // cart_page();
  });

function work_on_data(obj) {
  let result = get_category(obj);
  spread_data(result);
}

function get_category(obj) {
  let categories = {};
  for (let record of obj) {
    if (categories.hasOwnProperty(record["category"])) {
      categories[record["category"]].push(record);
    } else {
      categories[record["category"]] = [record];
    }
  }
  return categories;
}

function spread_data(cat_arr) {
  //// cat_arr is array of arrays of dictionaries

  // home is the main container of all the data
  let home = document.getElementById("home");

  // setting maximum number of character for title and description in line 67 and 72
  // TODO: make them responsive to the card size

  const max_desc = 100;
  let max_title = 40;

  // this i is used to number the category headings to use them in anchor tags in html
  let i = 0;
  for (let category in cat_arr) {
    i++;
    let cat_heading = document.createElement("div");
    cat_heading.className = "category_heading";
    cat_heading.textContent = category;
    cat_heading.id = `cat${i}`;
    home.appendChild(cat_heading);

    //// now we stack all the card components together
    //// bafore adding them to the DOM to speedup the loading
    /// and minimize the performance bottleneck.

    let fargment = document.createDocumentFragment();

    for (let c of cat_arr[category]) {
      /// modifying the title and description to show only
      //the first max_desc and max_title of each one of them

      let modified_description = c.description;
      if (modified_description.length > max_desc) {
        modified_description = modified_description.slice(0, max_desc) + "...";
      }

      let modified_title = c.title;
      if (modified_title.length > max_title) {
        modified_title = modified_title.slice(0, max_title) + "...";
      }
      // a card to show product data
      let card = document.createElement("div");
      card.className = "product_card";
      card.id = c.id;
      // title of the card
      let title = document.createElement("div");
      title.className = "product_title";
      title.textContent = modified_title;

      // here I created a div to contain the image to appy zoom on hover effects
      let image_div = document.createElement("div");
      image_div.className = "image_div";

      //imgae of the card
      let image = document.createElement("img");
      image.className = "product_image";
      image.src = c.image;
      image.alt = "Product Image";
      image_div.appendChild(image);

      // rating of the product
      let rating = document.createElement("div");
      rating.className = "product_rating";
      rating.innerHTML = `
      <span class="product_stars">${"⭐".repeat(
        Math.round(c.rating.rate)
      )}</span>
      <span class="product_reviews">(${c.rating.count})</span>
      <span class="product_price">EGP ${c.price}</span>
      `;

      // product description
      let info = document.createElement("div");
      info.className = "product_info";
      let description = document.createElement("p");
      description.className = "product_description";
      description.textContent = modified_description;
      info.appendChild(description);

      // add to cart button
      let button = document.createElement("button");
      button.className = "add_to_cart";
      // determining the color and textContent of the button depending on the number of products in cart
      let storage = JSON.parse(get_cookie("products_in_cart"));
      let n_in_cart = storage.filter((x) => x == c.id).length; // getting the number of car id in the cart

      if (n_in_cart > 0) {
        button.textContent = `${n_in_cart} In Cart ✔️`;
        button.style.background = "rgb(6, 139, 6)";
      } else {
        button.textContent = "Add To Cart 🛒";
      }

      // summing up the card components
      card.appendChild(title);
      card.appendChild(image_div);
      card.appendChild(rating);
      card.appendChild(info);
      card.appendChild(button);

      //  adding the card to the fargment
      fargment.appendChild(card);
    }

    // adding the fragment to another div to represent the collection of cards specific to a category
    // in order to give the different style from the category heading like using flex

    let category_cards = document.createElement("div");
    category_cards.className = "category_cards";
    category_cards.appendChild(fargment);
    home.appendChild(category_cards);
  }
  // this is just an arrow to take you to the top of the page
  let arrow = document.createElement("a");
  arrow.href = "#";
  arrow.textContent = "⬆️";
  arrow.style.fontSize = "1.5rem";
  home.appendChild(arrow);
}

function initialize_cart() {
  /**
   * this function initializes the cart value to 0 by adding a new cookie value
   * products_in_cart = []
   * this function is helpful when we don't have cookie key name thus the number of products in cart
   * Returns : the element in nav bar itself which shows the number of products in cart
   */
  // getting the number of products in the cart
  let products_in_cart = document.getElementById("products_in_cart");

  // checking if the cookie value of the products in cart is empty
  let storage = get_cookie("products_in_cart");
  console.log(storage);

  if (storage == undefined) {
    add_cookie("products_in_cart", "[]");
  }

  // getting the  value of products from cookie storage
  products_in_cart.textContent = JSON.parse(
    get_cookie("products_in_cart")
  ).length;

  return products_in_cart;
}

function cart_event(products_in_cart) {
  // adding eventlistener to all the buttons (add to cart)
  let add_to_cart = document.querySelectorAll(".add_to_cart");

  // getting the color of any button (the first one)
  let color = window.getComputedStyle(add_to_cart[0]).backgroundColor;

  add_to_cart.forEach((button) => {
    button.addEventListener("click", function () {
      // change the color of the button whenever I clicket to lime green waiting
      // for the setTimeout to rever the color back whether to green or blue
      button.style.backgroundColor = "limegreen";
      let storage = JSON.parse(get_cookie("products_in_cart"));
      if (storage.length < 6) {
        storage.push(button.parentElement.id);
        add_cookie("products_in_cart", JSON.stringify(storage));
        let n_in_cart = storage.filter(
          (x) => x == button.parentElement.id
        ).length;

        products_in_cart.textContent = storage.length;
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
  });

  let clear = document.getElementById("clear_cart");
  clear.addEventListener("click", function () {
    add_cookie("products_in_cart", "[]");
    products_in_cart.textContent = 0;
    add_to_cart.forEach((button) => {
      button.textContent = "Add To Cart 🛒";
      button.style.backgroundColor = " #227bb7";
    });
  });
}

function product_event() {
  let products = document.querySelectorAll(".image_div");
  products.forEach((product) => {
    product.addEventListener("click", function () {
      window.open("../product_page/product.html");
      console.log("clicked on the image_div");
    });
  });
}

let x = document.getElementById("view_cart");
x.addEventListener("click", function () {
  window.open("../cart_page/cart.html");
});

// TODO:
// add a cart page to show the products in the cart like in cards
//  add a search bar to search for products
