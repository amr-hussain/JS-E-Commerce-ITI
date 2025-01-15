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
    location.replace('../index.html')
}