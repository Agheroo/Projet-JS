const openNav = () => {
    document.getElementById("nav-center").style.width = "50%";
    document.getElementById("cross").style.display = "block";
    document.getElementById("hamburger").style.display = "none";
}
const closeNav = () => {
    document.getElementById("nav-center").style.width = "0";
    document.getElementById("hamburger").style.display = "block";
}