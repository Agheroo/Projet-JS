const checkIfCompleted = () =>{
    let weight = document.getElementById("weight").value;
    let age = document.getElementById("age").value;
    let height = document.getElementById("height").value;
    let inputs = ["weight","age","height"];
    for(let input in inputs){
        if(document.getElementById(inputs[input]).value == ""){
            document.getElementById(inputs[input]).style.border = "solid 1px red";
            //alert("Veuillez rentrer des informations valides");
            return ;
        }
        else
        document.getElementById(inputs[input]).style.border = "none";
    }
}

