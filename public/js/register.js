const checkAddUser = () =>{
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let pass = document.getElementById("password").value;
    let repeat = document.getElementById("repeat-password").value;
    let inputs = ["username","email","password","repeat-password"];
    for(let input in inputs){
        if(document.getElementById(inputs[input]).value == ""){
            document.getElementById(inputs[input]).style.border = "solid 1px red";
            //alert("Veuillez rentrer des informations valides");
            return;
        }
        else
        document.getElementById(inputs[input]).style.border = "none";
    }

    if(repeat != pass){
        alert("Vos mots de passe ne correspondent pas !");
        document.getElementById(inputs[3]).style.border = "solid 1px red";
        return;
    }
    else
    document.getElementById(inputs[input]).style.border = "none";
}