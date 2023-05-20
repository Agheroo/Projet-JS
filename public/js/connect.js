const checkUserConnect = () =>{
    let inputs = ["email","password"];
    let email = document.getElementById("email").value;
    let pass = document.getElementById("password").value;
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

    //Then verify input informations with back to proceed to connexion
}