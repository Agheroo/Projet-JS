const checkAddUser = () =>{
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let pass = document.getElementById("password").value;
    let confirm_pass = document.getElementById("repeat-password").value;
    let inputs = ["username","email","password","repeat-password"];
    for(let input in inputs){
<<<<<<< HEAD
        console.log(inputs[input]);
=======
>>>>>>> a87dc19a90e4eb20a45ccced9f9677b734512b29
        if(document.getElementById(inputs[input]).value == ""){
            document.getElementById(inputs[input]).style.border = "solid 1px red";
            alert("Veuillez rentrer des informations valides");
            return;
        }
        else
        document.getElementById(inputs[input]).style.border = "none";
    }
    if(pass != confirm_pass){
        document.getElementById("repeat-password").style.border = "solid 1px red";
        alert("Veuillez vérifier votre mot de passe");
        return;
    }


    //Then process the values in input to link it to back
}