const showWrittenPassword = () =>{
    if(document.getElementById("password").type == "password"){
        document.getElementById("password").type = "text";
<<<<<<< HEAD
        document.getElementById("eye").src = "../public/img/eye.png";
    }
    else{
        document.getElementById("password").type = "password";
        document.getElementById("eye").src = "../public/img/closed-eye.png";
=======
        document.getElementById("eye").src = "img/eye.png";
    }
    else{
        document.getElementById("password").type = "password";
        document.getElementById("eye").src = "img/closed-eye.png";
>>>>>>> a87dc19a90e4eb20a45ccced9f9677b734512b29
    }
}
const openNav = () => {
    is_nav_open = true;
    document.getElementById("nav-center").style.width = "60%";
    document.getElementById("cross").style.display = "block";
    document.getElementById("hamburger").style.display = "none";
}
const closeNav = () => {
    is_nav_open = false
    document.getElementById("nav-center").style.width = "0";
    document.getElementById("hamburger").style.display = "block";
}