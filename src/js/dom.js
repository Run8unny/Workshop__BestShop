document.addEventListener('DOMContentLoaded', () => {
const formCalc = document.querySelector('.calc__form');
const select = document.querySelector('.select__dropdown');
const checkbox = document.querySelectorAll('.form__checkbox');
const summary = document.querySelector('.calc__summary');

class Calculator {
    constructor (form, summary) {
        this.form = {
            products: form.querySelector("#products"),
            orders: form.querySelector("#orders"),
            package: form.querySelector("#package"),
            accounting: form.querySelector("#accounting"),
            terminal: form.querySelector("#terminal")
        };
        this.summary = {
            list: summary.querySelector("ul"),
            items: summary.querySelector("ul").children,
            total: {
                container: summary.querySelector("#total-price"),
                price: summary.querySelector(".total__price")
            }
        };

        this.prices = {
            products: 0.4,
            orders: 0.3,
            package: {
                basic: 0,
                professional: 20,
                premium: 40
            },
            accounting: 25,
            terminal: 5
        };
    }

    Calc(e) {
        const id = e.currentTarget.id;
        const value = e.currentTarget.value;
        const price = this.prices[id];
        const totalPrice = value * price;
    }

    PrintPrices(id, calc, total, callback) {
        const summary = this.summary.list.querySelector('[data-id=" + id + "]');
        const sumCalc = summary.querySelector('.item__calc');
        const  sumPrice = summary.querySelector('.item__price');

        summary.classList.add('open');
    }
}

});