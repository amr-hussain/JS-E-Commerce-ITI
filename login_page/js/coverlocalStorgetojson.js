function backup(){
const data = localStorage.getItem('users');

           
const blob = new Blob([data], { type: "application/json" });
const url = URL.createObjectURL(blob);


const a = document.createElement("a");
a.href = url;
a.download = "user.json";
a.click();


URL.revokeObjectURL(url);
}