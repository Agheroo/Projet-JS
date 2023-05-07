var lastScrollTop = 0;
var is_nav_open = false;
/*window.addEventListener("scroll", function(){
    var nav = document.getElementById("nav");
    var st= window.pageYOffset || document.documentElement.scrollTop;
    if(st > lastScrollTop && is_nav_open == false){ //downscroll
        nav.style.filter = "blur(2px)";
        nav.style.transform = "translateY(-110%)";
    }
    if(st <= lastScrollTop && is_nav_open == false){ //upscroll
        nav.style.filter = "blur(0)";
        nav.style.transform = "translateY(0%)";
    }

    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
}, false);*/

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