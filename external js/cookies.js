function get_cookie(key) {
  let strs = document.cookie.split(";");
  for (let str of strs) {
    let key_value = str.split("=");
    if (key.trim() == key_value[0].trim()) {
      return key_value[1];
    }
  }
  // return "not found";
}

function get_all_cookie() {
  let strs = document.cookie.split(";");
  let records = Array(document.cookie.split(";"));
//   console.log(records[1])
  return strs
}

function add_cookie(key, value, days = 0) {
    if (days != 0){
        let exp = new Date()
        exp.setTime(exp.getTime() +(days * 24 * 60 * 60 * 1000));
        document.cookie = `${key}=${value};expires=${exp}`;
    }
    else {

        document.cookie = `${key}=${value};`;
    }

}

function update_cookie(key, value, days = 0) {
    if (days != 0){
        let exp = new Date()
        exp.setTime(exp.getTime() +(days * 24 * 60 * 60 * 1000));
        document.cookie = `${key}=${value};expires=${exp}`;
    }
    else {
        document.cookie = `${key}=${value};`;
    }

}
function delete_cookie(key) {
    let d = new Date()
    d.setTime(d.getTime()- 100*(24 * 60 * 60 * 1000));
  document.cookie = `${key}=1;expires=${d};`;
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
      return JSON.parse(key_value[1]);
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
   * used the ordinay add_cookie() 
   * */
      document.cookie = `${key}=${JSON.stringify(value)};`;
}


export { get_cookie, get_all_cookie, add_cookie, update_cookie, delete_cookie, add_cookie_object, get_cookie_object };
