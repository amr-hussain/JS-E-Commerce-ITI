import { add_cookie, get_cookie } from "./cookies.js";

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

fetch('./fake_store.json')
  .then(response => response.json())
  .then(data => {
    json_obj = data;
    work_on_data(json_obj);
    let p_cart =  main(); // p_cart is an array of the products in cart cookie value
    cart_event(p_cart);
    // cart_page();
  })
  .catch(error => console.error('Error fetching the JSON file:', error));




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
      image_div.appendChild(image)
      
      
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
      button.id = "add_to_cart";
      button.textContent = "🛒";

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
  let arrow = document.createElement("a");
  arrow.href = "#";
  arrow.textContent = "⬆️";
  arrow.style.fontSize = "1.5rem";
  home.appendChild(arrow);
}


function main() {
  // getting the number of products in the cart
  let products_in_cart = document.getElementById("products_in_cart");
 
  // checking if the cookie value of the products in cart is empty
  let storage = get_cookie("products_in_cart");
  console.log(storage);

  if (storage == undefined) {
    add_cookie("products_in_cart", '[]');
    
    // getting the  value of products from cookie storage
  }
  
  products_in_cart.textContent = JSON.parse(get_cookie("products_in_cart")).length;    
  
  return products_in_cart
}

function cart_event(p_cart){


  let products_in_cart = p_cart
  // adding eventlistener to all the buttons (add to cart)
  let add_to_cart = document.querySelectorAll("#add_to_cart");

  // getting the color of any button (the first one)
  let color = window.getComputedStyle(add_to_cart[0]).backgroundColor;

  add_to_cart.forEach((button) => {
    button.addEventListener("click", function () {
      if (button.textContent == "✔️") {

        let storage = JSON.parse(get_cookie("products_in_cart"));

        console.log(storage)
        let index = storage.indexOf(button.parentElement.id);
        if (index !== -1) {
          storage.splice(index, 1);
        }
        add_cookie("products_in_cart", JSON.stringify(storage));
        storage = JSON.parse(get_cookie("products_in_cart"));

        products_in_cart.textContent = storage.length;
        button.textContent = "🛒";
        // changin the color of the button on click
        button.style.backgroundColor = "limegreen";
        setTimeout(() => {
          button.style.backgroundColor = color;
        }, 500);
        // button.style.backgroundColor = color;
      } else {

        // console.log(typeof get_cookie("products_in_cart"))
        let storage = JSON.parse(get_cookie("products_in_cart"));
        // alert(button.parentElement.id)
        storage.push(button.parentElement.id);
        add_cookie("products_in_cart", JSON.stringify(storage));
        storage = JSON.parse(get_cookie("products_in_cart"));
        products_in_cart.textContent = storage.length;
        button.textContent = "✔️";

        // changin the color of the button on click temporarily
        button.style.backgroundColor = "limegreen";
        setTimeout(() => {
          button.style.backgroundColor = "cyan";
        }, 500);
      }
      console.log("clicked");
    });
  });

  let clear = document.getElementById("clear_cart");
  clear.addEventListener("click", function () {
    add_cookie("products_in_cart", '[]');
    products_in_cart.textContent = 0;
    add_to_cart.forEach((button) => {
      button.textContent = "🛒";
      button.style.backgroundColor = color;
    });
  });
}


let x = document.getElementById('view_cart');
          x.addEventListener('click', function(){
              window.open("./cart_page/cart.html")
          })
// TODO:
// add a cart page to show the products in the cart like in cards
//  add a search bar to search for products


