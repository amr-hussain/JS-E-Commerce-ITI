document.getElementById('div').style.display = 'block'
document.getElementById('div1').style.display = 'none'
var form = document.getElementById('form')
var form1 = document.getElementById('form1')
let fn = document.getElementById('f_name')
let ln = document.getElementById('l_name')
let email = document.getElementById('email')
let birthdate = document.getElementById('birthdate')
let phone = document.getElementById('phone')
let password = document.getElementById('password')

var xhr = new XMLHttpRequest()
let user1 =localStorage.getItem('users')
if(user1){}else{
    user1=[]
xhr.open("Get", "./user.json")
xhr.setRequestHeader("Content-type", "application/json")
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        
        user1.push(xhr.response)
        localStorage.setItem('users',user1)
    }
}

xhr.send()
}
function adduser(obj){
users=JSON.parse(localStorage.getItem('users'))
users.push(obj)
localStorage.setItem('users',JSON.stringify(users))
}


function register_style() {
    document.getElementById('div').style.display = 'none'
    document.getElementById('div1').style.display = 'block'


}

function login_style() {
    document.getElementById('div').style.display = 'block'
    document.getElementById('div1').style.display = 'none'
}
form1.onsubmit = (ev) => {


    ev.preventDefault()


    if (IsEmail(email.value) && IsPhone(phone.value) && IsDate(birthdate.value) && !IsExist(email.value) && IsStrongPass(password.value)) {
        let obj = new createObject(fn.value, ln.value, email.value, phone.value, birthdate.value, password.value)

        adduser(obj)
        
        form1.submit()
    }



}

form.onsubmit = (ev) => {
    ev.preventDefault()
    let user = document.getElementById('username')
    let pass = document.getElementById('pass')
    if (IsExist(user.value)) {
        if (Ispasstrue(user.value, pass.value)) {
            let current = JSON.stringify(current_user(user.value))
            localStorage.setItem('current_user',current)
           
            form.submit()
        } else {
            pass.nextElementSibling.style.color = 'red'
            pass.nextElementSibling.textContent = 'Password invalid!'

        }
    } else {
        user.nextElementSibling.style.color = 'red'
        user.nextElementSibling.textContent = 'invalid Email'
    }
}
//get input type text f_name &l_name 
////don't allow write number
fn.addEventListener('input', function () {
    this.value = this.value.replace(/[^A-Za-z]/g, '');
});
ln.addEventListener('input', function () {
    this.value = this.value.replace(/[^A-Za-z]/g, '');
});

email.addEventListener('blur', () => {
   
    let b=!IsEmail(email.value)
    if (b) {
          email.nextElementSibling.style.color = 'red'
        email.nextElementSibling.textContent = 'invalid Email'
      
    }
    if (IsExist(email.value)) {
        email.nextElementSibling.style.color = 'red'
        email.nextElementSibling.textContent ='already exists Email !'
       
      
    }
    
})
phone.addEventListener('blur', () => {
    if (!IsPhone(phone.value)) {
        phone.nextElementSibling.textContent = 'invalid Phone number!'
        phone.nextElementSibling.style.color = 'red'
    }
})
birthdate.addEventListener('blur', () => {
    if (!IsDate(birthdate.value)) {
        birthdate.nextElementSibling.textContent = 'invalid Date'
        birthdate.nextElementSibling.style.color = 'red'
    }
})
password.addEventListener('blur', () => {
    if (!IsStrongPass(password.value)) {
        password.nextElementSibling.textContent = 'Password invalid use last one Uppercase and 8 charters'
        password.nextElementSibling.style.color = 'red'
    }
})

//this function check phone number
function IsPhone(phone) {
    var reg = /^01(1|2|0|5)[0-9]{8}/
    return reg.test(phone)
}

//this function check mail
function IsEmail(mail) {
    let regemail = /^[a-z0-9/.]+@[a-z0-9]+\.(com|net|edu|org)+$/gi
    return regemail.test(mail)
}
/// this function check date
function IsDate(bd){
    
 if(bd.length==10){
    if(bd[4]=='-'&&bd[7]=='-'){
        let d=parseInt(bd[8]+bd[9])
        let m=parseInt(bd[5]+bd[6])
        let y=parseInt(bd[0]+bd[1]+bd[2]+bd[3])
        if(!isNaN(d)||!isNaN(m)||!isNaN(y)){
            
        let ob_Date =new Date(y,m-1,d)
            
        if(
            ob_Date.getFullYear() == y&&ob_Date.getMonth() ==m-1 && ob_Date.getDate() ==d
        ){
            
               return true    
            
        }else{
            return false
        }
        }
        else{
            return false
        }


    }else{
        return false
    }
 }else{
    return false
 }

}

function createObject(fn, ln, em, ph, bd, pas) {
    this.f_name = fn
    this.l_name = ln
    this.Email = em
    this.phone = ph
    this.birthdate = bd
    this.Passwoed = pas
}
function IsExist(em){
   let use=JSON.parse(localStorage.getItem('users'))
   for(u of use){
    if(u.Email==em){
        return true
    }
   }
   return false
}
function current_user(em){
    let use=JSON.parse(localStorage.getItem('users'))
   for(u of use){
    if(u.Email==em){
        return u
    }
   }
   
}
function IsStrongPass(pass){
     let passwordRegex = /^(?=.*[A-Z]).{8,}$/;
     return passwordRegex.test(pass)
}
function Ispasstrue(em,pass){
    let use=JSON.parse(localStorage.getItem('users'))
    for(u of use){
     if(u.Email==em&& u.Passwoed==pass){
         return true
     }
    }
    return false
 }