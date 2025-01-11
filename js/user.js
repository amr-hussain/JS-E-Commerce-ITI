var xhr = new XMLHttpRequest()
let users =[]
xhr.open("Get", "./user.json")
xhr.setRequestHeader("Content-type", "application/json")
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        
        users.push(xhr.response)
        localStorage.setItem('users',users)
    }
}

xhr.send()
function adduser(obj){
users=JSON.parse(localStorage.getItem('users'))
users.push(obj)
localStorage.setItem('users',JSON.stringify(users))
}
// var xhr = new XMLHttpRequest()
// let users =[]
// xhr.open("Get", "./user.json")
// xhr.setRequestHeader("Content-type", "application/json")
// xhr.onreadystatechange = function () {
//     if (xhr.readyState == 4 && xhr.status == 200) {
        
//         users.push(xhr.response)
//         localStorage.setItem('users',users)
//     }
// }

// xhr.send()
// function adduser(obj){


    
//     xhr.open('POST', './user.json', true);
//     xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState === 4 && xhr.status === 200) {
//             console.log('Data saved successfully');
//         } else if (xhr.readyState === 4) {
//             console.error('Error saving data:', xhr.statusText);
//         }
//     };
//     xhr.send(JSON.stringify(obj));

// }
