import { add_cookie_object, get_cookie_object } from "../external js/cookies.js";


let json_obj = null;

fetch("../json folder/fake_store.json")
  .then((response) => response.json())
  .then((data) => {
    json_obj = data;
    let products_in_cart = initialize_cart(); // products_in_cart is the element showing the number of things in cart currently
    work_on_data(json_obj);
    cart_event(products_in_cart);
    product_event();
    automate_scrolling();
    // adding searching capabilities 
    main_search(json_obj);
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


  // const max_desc = 100;
  // let max_title = 40;

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

      // let modified_description = c.description;
      // if (modified_description.length > max_desc) {
      //   modified_description = modified_description.slice(0, max_desc) + "...";
      // }

      // let modified_title = c.title;
      // if (modified_title.length > max_title) {
      //   modified_title = modified_title.slice(0, max_title) + "...";
      // }

      // a card to show product data
      let card = document.createElement("div");
      card.className = "product_card";
      card.id = c.id;
      // title of the card
      // let title = document.createElement("div");
      // title.className = "product_title";
      // title.textContent = modified_title;

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
      // let info = document.createElement("div");
      // info.className = "product_info";
      // let description = document.createElement("p");
      // description.className = "product_description";
      // description.textContent = modified_description;
      // info.appendChild(description);

      // add to cart button
      let button = document.createElement("button");
      button.className = "add_to_cart";
      // determining the color and textContent of the button depending on the number of products in cart
      let storage =  get_cookie_object("products_in_cart");
      let n_in_cart = storage.filter((x) => x == c.id).length; // getting the number of car id in the cart

      if (n_in_cart > 0) {
        button.textContent = `${n_in_cart} In Cart ✔️`;
        button.style.background = "rgb(6, 139, 6)";
      } else {
        button.textContent = "Add To Cart 🛒";
      }

      // summing up the card components
      // card.appendChild(title);
      card.appendChild(image_div);
      card.appendChild(rating);
      // card.appendChild(info);
      card.appendChild(button);

      //  adding the card to the fargment
      fargment.appendChild(card);
    }

    // creating a gallery with button + cards + button 
    let gallery = document.createElement("div")
    gallery.className = "gallery"

    // left arrow 
    let l_arrow = document.createElement('button')
    l_arrow.innerHTML = "&#8592"
    l_arrow.className = "arrow left"
    // right arrow 
    let r_arrow = document.createElement('button')
    r_arrow.innerHTML = "&#8594"
    r_arrow.className = "arrow right"


    // cards div
    let category_cards = document.createElement("div");
    category_cards.className = "category_cards";
    category_cards.appendChild(fargment);

    gallery.appendChild(l_arrow)
    gallery.appendChild(category_cards)
    gallery.appendChild(r_arrow)

    home.appendChild(gallery);
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
  let storage = get_cookie_object("products_in_cart");
  console.log(storage);

  if (storage == undefined) {
    // add empty array to [].length = 0
    add_cookie_object("products_in_cart", []);
  }



  // getting the  value of products from cookie storage
  products_in_cart.textContent = '0';

  return products_in_cart;
}

function cart_event(products_in_cart) {
  // adding eventlistener to all the buttons (add to cart)
  let add_to_cart = document.querySelectorAll(".add_to_cart");

  add_to_cart.forEach((button) => {
    button.addEventListener("click", function () {
      // change the color of the button whenever I clicket to lime green waiting
      // for the setTimeout to rever the color back whether to green or blue
      button.style.backgroundColor = "limegreen";
      let storage =  get_cookie_object("products_in_cart");
      if (storage.length < 6) {
        storage.push(button.parentElement.id);
        console.log(storage)
        add_cookie_object("products_in_cart", storage);
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
    add_cookie_object("products_in_cart", []);
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
      // extracting the id of the product cart to pass it 
      let product_id = product.parentElement.id
      let cart_cookie = get_cookie_object("products_in_cart")

      window.open(
        `../product_page/product.html?id=${product_id}`,
         '_self'
        );
      console.log("clicked on the image_div");
    });
  });
}

function automate_scrolling(){
  let galleries = document.querySelectorAll(".gallery")
  galleries.forEach((gallery)=>{
    let cards = gallery.querySelector(".category_cards")

    let l_arrow = gallery.querySelector('.arrow.left')
    let r_arrow = gallery.querySelector('.arrow.right')
    if (l_arrow && r_arrow){
        l_arrow.addEventListener("click", ()=>{
            cards.scrollBy({ left: -1250, behavior: 'smooth' }); 
            console.log("clicked")
            
        });
        r_arrow.addEventListener("click", ()=>{
            cards.scrollBy({ left: 1250, behavior: 'smooth' });
            console.log("clicked")
          });
          
      }
      else {
          
          console.log("noooooooooooooooooooooooooooot working")
    }

    let scroll_interval;

    scroll_interval = scroll(cards, scroll_interval) 
    gallery.addEventListener('mouseenter', () =>{
      // console.log("mouse in ")
      clearInterval(scroll_interval);
    });
    gallery.addEventListener('mouseleave', () => {
  
    scroll_interval = scroll(cards, scroll_interval)
    // console.log("mouse out ")
    });
  })
}

function scroll(cards_window, interval_id){
  interval_id = setInterval(() => {
    cards_window.scrollBy({ left: 250, behavior: 'smooth' }); // Scroll 1 card width
    if (cards_window.scrollLeft + cards_window.clientWidth >= cards_window.scrollWidth) {
        cards_window.scrollTo({ left: 0, behavior: 'smooth' }); // Loop back to start
    }
  }, 3000);
  return interval_id
}



let x = document.getElementById("view_cart");
x.addEventListener("click", function () {
  window.open("../cart_page/cart.html");
});

// TODO:
// add a cart page to show the products in the cart like in cards
// add a search bar to search for products

// the search function ////////////////////////////////
function main_search(dict){
  // query all the titles of the products 
  console.log(dict)
  let title_id = [];
  for (let p in dict){
    const title = dict[p].title;
    const id = dict[p].id;
    title_id.push([id, title])
  }
  let search_list = document.getElementById("search_input");
  search_list.addEventListener("input",() =>{
    update_drop_list(title_id);
    console.log("typed a char")
  });
  search_list.addEventListener("click",() =>{
    update_drop_list(title_id);
    console.log("cliccked on input")
  });

  // managing the view product button 
  let view_product = document.querySelector(".view_product")
  view_product.addEventListener("click", ()=>{
    window.open(
      `../product_page/product.html?id=${view_product.id}`,
       '_self'
      );
  })
}

function update_drop_list(title_id){
  let input_value = document.getElementById('search_input').value.toLowerCase();
  let drop_list = document.getElementById('drop_list')


  // clear any previous items
  drop_list.innerHTML = "";

  
  if (input_value == "") {
    drop_list.style.display = 'none'
    console.log("added hidden")
    return;
  }
  
  let filtered_products = title_id.filter((item) =>
    item[1].toLowerCase().includes(input_value)
);


  filtered_products.forEach((item) => {
    const list_item = document.createElement("li");
    list_item.textContent = item[1];
    list_item.id = item[0]

    // Add click event to fill the input with the selected item
    list_item.addEventListener("click", () => {
      drop_list.style.display = 'none'
      let view_product = document.querySelector('.view_product')
      view_product.style.display = ''
      view_product.id = list_item.id
      document.getElementById("search_input").value = item[1];
      console.log("added")
    });
    drop_list.appendChild(list_item);
  });
  if (filtered_products.length ==0 ) {
    drop_list.style.display = 'none'

  }
  else {
    // hide it if no match
    drop_list.style.display = ''
  }
  
  
  
  document.addEventListener("click", (event) => {
    const drop_list = document.getElementById("drop_list");
    const input = document.getElementById("search_input");
    // فحص اذا النقرة برا الانبت وبرا الدروب لست
    if (!input.contains(event.target) && !drop_list.contains(event.target)) {
      drop_list.style.display = 'none'
    }
  });
}



document.querySelectorAll('.filter-buttons button').forEach(button => {
  button.addEventListener('click', (event) => {
      const category = event.target.getAttribute('data-category'); // الحصول على الفئة
      const url = `../filter product/products.html?category=${encodeURIComponent(category)}`; // رابط صفحة المنتجات مع الفئة
      window.location.href = url; // نقل المستخدم للصفحة المطلوبة
  });
});