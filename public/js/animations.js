const showWrittenPassword = () =>{
    if(document.getElementById("password").type == "password"){
        document.getElementById("password").type = "text";
        document.getElementById("eye").src = "../public/img/eye.png";
    }
    else{
        document.getElementById("password").type = "password";
        document.getElementById("eye").src = "../public/img/closed-eye.png";
    }
}
const openNav = () => {
    is_nav_open = true;
    document.getElementById("nav-center").style.width = "50%";
    document.getElementById("cross").style.display = "block";
    document.getElementById("hamburger").style.display = "none";
}
const closeNav = () => {
    is_nav_open = false
    document.getElementById("nav-center").style.width = "0";
    document.getElementById("hamburger").style.display = "block";
}