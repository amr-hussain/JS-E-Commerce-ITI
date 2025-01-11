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