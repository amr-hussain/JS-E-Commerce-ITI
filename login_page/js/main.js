document.getElementById('div').style.display='block'
document.getElementById('div1').style.display='none'
var form= document.getElementById('form')
var form1= document.getElementById('form1')
let fn =document.getElementById('f_name')
let ln =document.getElementById('l_name')
let email =document.getElementById('email')
let birthdate =document.getElementById('birthdate')
let phone =document.getElementById('phone')
    
let password =document.getElementById('password')
let re_password = document.getElementById('re-password')



function register_style(){
    document.getElementById('div').style.display='none'
    document.getElementById('div1').style.display='block'
    
    
}
function login_style(){
    document.getElementById('div').style.display='block'
    document.getElementById('div1').style.display='none'
}
form1.onsubmit= (ev)=>{
        
        
        ev.preventDefault()
    
    
    if(!IsEmail(email.value)){
        email.setCustomValidity('invalid Email !')
    }
    if(IsExist(email.value)){
        email.setCustomValidity('already exists Email !')
    }
    if(!IsPhone(phone.value)){
        phone.setCustomValidity('invalid Phone number!')
    }
   
    if(!IsDate(birthdate.value)){
        birthdate.setCustomValidity('invalid Date')
    }
    if(!IsStrongPass(password.value)){
        password.setCustomValidity('Password invalid use last one Uppercase')
    }
   if(IsEmail(email.value)&&IsPhone(phone.value)&&IsDate(birthdate.value)&&!IsExist(email.value)&&IsStrongPass(password.value)){
        let obj=new createObject(fn.value,ln.value,email.value,phone.value,birthdate.value,password.value)
        
        adduser(obj)
   }
        

    
}

form.onsubmit=(ev)=>{
    ev.preventDefault()
    let user=document.getElementById('username')
    let pass=document.getElementById('pass')
    if(IsExist(user.value)){
        if(Ispasstrue(user.value,pass.value)){
            form.submit()
        }else{
            pass.setCustomValidity('Password invalid')
        }
    }else{
        user.setCustomValidity('Email invalid')
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

    
   


