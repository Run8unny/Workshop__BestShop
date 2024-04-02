

function menuBurger() {
    const btn = document.querySelector(".burger__menu");
    const body = document.querySelector("body");

    btn.onclick = () => {
        body.classList.toggle("show-menu");
    }
}

menuBurger();