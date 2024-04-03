const formCalc = document.querySelector('.calc__form');
const select = document.querySelector('.select__dropdown');
const checkbox = document.querySelectorAll('.form__checkbox');
const summary = document.querySelector('.calc__summary');

class Calc {
    constructor (form, summary) {

    }
}

function menuBurger() {
    const btn = document.querySelector(".burger__menu");
    const body = document.querySelector("body");

    btn.onclick = () => {
        body.classList.toggle("show-menu");
    }
}

menuBurger();