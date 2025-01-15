let current=JSON.parse(localStorage.getItem('current_user'))
let name1 =document.getElementById('name')
let email =document.getElementById('email')
name1.value = current.f_name+" "+current.l_name
email.value = current.Email
name1.disabled=true
email.disabled=true
let products_in = get_cookie_object("products_in_cart");
let productsjson;
let order = document.getElementById('order-summary')
let mhr =new XMLHttpRequest()
mhr.open('GET','../json folder/fake_store.json')
mhr.onreadystatechange = function () {
    if (mhr.readyState == 4 && mhr.status == 200) {
        console.log("okkkkkk");
        
       productsjson = JSON.parse(mhr.response)
       console.log(productsjson);
       
       start()
    }
}

mhr.send()

console.log(products_in);

function start(){
let values = [];
let redd =[];
for(pro of products_in){
    let counter =0;
    for(p of products_in){
        if(pro == p){
            counter++
        }
    }
    values.push(pro);
    redd.push(counter);

}
let groupedValues = {};
for (let i = 0; i < values.length; i++) {
    groupedValues[values[i]] = redd[i];
}
let total = 0;
let ul= document.createElement('ul');
for( product of productsjson){
    if(product.id in groupedValues){
        let price=groupedValues[product.id]*product.price
        ul.innerHTML += `<li>${groupedValues[product.id]}   :  ${product.title}   :   ${price} EGP</li>`
        total+=price

    }

}
let h =document.createElement('h2')
h.innerHTML=`Order Summary`
order.appendChild(h)
order.appendChild(ul)
order.innerHTML += `<p>Total: ${total}</p>`
}
function get_cookie_object(key){

  /**
   * this function is the same as get_cookie but it uses JSON.parse()
   * at the end to retrieve the data in original format rather than
   * a string
   */
  let strs = document.cookie.split(";");
  for (let str of strs) {
    let key_value = str.split("=");
    if (key.trim() == key_value[0].trim()) {
      return JSON.parse(decodeURIComponent(key_value[1]));
    }
    else{
      return undefined
    }
  }
}
function add_cookie_object(key, value){
    /**
     * this function is the same as add_get_cookie but it uses JSON.stringify()
     * on the value to set an array like this "[3, 2, 5]" rather that 3, 2, 5 if we
     * used the ordinay add_cookie() also, it makes the cookie global through all pages
     * */
        document.cookie = `${key}=${JSON.stringify(value)};path=/;`;
  }
let form = document.getElementById('checkout-form')
form.onsubmit = (ev) => {


    ev.preventDefault()
    add_cookie_object('products_in_cart',[])
    alert('your order in way!')
    
        form.submit()
    



}