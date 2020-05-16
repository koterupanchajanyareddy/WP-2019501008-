function check(){
    if(validation)
    document.getElementById("form_id").submit();
    else
    alert("Please check your format of username and password");
}

function validation() {
    var password = document.getElementById("password").value;
    var email = document.getElementById("email").value;
    var emailReg = /^([w-.]+@([w-]+.)+[w-]{2,4})?$/;
    var decimal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if (password === '' || email === '') {
    alert("Please fill all fields...!!!!!!");
    return false;
    } else if (!(email).match(emailReg)) {
    alert("Invalid Email...!!!!!!");
    return false;
    }else if(len(password)< 6){
        alert("Invalid password....");
        return false;
    }else if(!(password).match(decimal)){
        alert("Invalid password....");
        return false;
    } else {
    return true;
    }
}