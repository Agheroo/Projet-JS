const checkAddUser = () =>{
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let pass = document.getElementById("password").value;
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


    //Then process the values in input to link it to back
}