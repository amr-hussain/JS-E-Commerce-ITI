let current = localStorage.getItem('current_user')
let div = document.getElementById('user')
if (current) {
    current = JSON.parse(current)
    let s = document.createElement('select')
    s.innerHTML = `<option>${current.f_name} ${current.l_name}</option>
                <option>${current.Email}</option>
                <option onclick='logout()' >Logout</option>
                `
    div.style = `  margin-top: 5px;
   
    border-radius: 5px;`
    div.appendChild(s)

} else {
    div.innerHTML = '<a href="../index.html">login</a>'
}

function logout() {
    localStorage.removeItem('current_user')
    add_cookie_object('products_in_cart', [])
    location.replace('../index.html')
}


function add_cookie_object(key, value){
    /**
     * this function is the same as add_get_cookie but it uses JSON.stringify()
     * on the value to set an array like this "[3, 2, 5]" rather that 3, 2, 5 if we
     * used the ordinay add_cookie() also, it makes the cookie global through all pages
     * */
        document.cookie = `${key}=${JSON.stringify(value)};path=/;`;
  }
  