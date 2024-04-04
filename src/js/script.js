function menuBurger() {
    const btn = document.querySelector(".burger__menu");
    const body = document.querySelector("body");

    btn.onclick = () => {
        body.classList.toggle("show-menu");
    }
}

menuBurger();

class Calculator {
    constructor(form, summary) {
        this.prices = {
            products: 0.5,
            orders: 0.4,
            package: {
                basic: 0,
                professional: 25,
                premium: 60
            },
            accounting: 25,
            terminal: 5
        };

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


    }

    handleInputs(e) {
        const id = e.currentTarget.id;
        const value = e.currentTarget.value;
        const price = this.prices[id];
        const totalPrice = (value * price).toFixed(2);

        this.updateUISummary(id, `${value} * $ ${price}`, totalPrice, function (item, calc, total) {
            if (value < 0) {
                calc.innerHTML = null;
                total.innerText = "Value should be greater than 0";
            }

            if (value.length === 0) {
                item.classList.remove("open");
            }
        });

        this.updateTotalPrice();
    }

    updateUISummary(id, value, totalPrice, callback){
        const summary = this.summary.list.querySelector(`[data-id=${id}]`);
        const itemCalc = summary.querySelector(".item__calc");
        const itemPrice = summary.querySelector(".item__price");

        summary.classList.add("open");

        if (itemCalc !== null) {
            itemCalc.innerText = value;
        }

        itemPrice.innerText = `$${totalPrice}`;

        if (typeof callback === "function") {
            callback(summary, itemCalc, itemPrice);
        }
    }

    handleSelect(e) {
        const icon = document.querySelector('.icon__calc');
        this.form.package.querySelector('.select__dropdown').classList.toggle('open');

        const value = typeof(e.target.dataset.value) !== "undefined" ? e.target.dataset.value : "";
        const text = typeof(e.target.dataset.value) !== "undefined" ? e.target.innerText : "Choose package";

        if (value.length > 0) {
            this.form.package.dataset.value = value;
            this.form.package.querySelector(".select__input").innerText = text;

            this.updateUISummary("package", text, this.prices.package[value]);
        }

        this.updateTotalPrice();
    }

    handleCheckbox(e) {
        const checkbox = e.currentTarget;
        const id = checkbox.id;
        const checked = e.currentTarget.checked;

        this.updateUISummary(id, undefined, this.prices[id], function (item) {
            if (!checked) {
                item.classList.remove("open");
            }
        });

        this.updateTotalPrice();
    }

    handleListeners() {
        // Inputs
        this.form.products.addEventListener("change", this.handleInputs.bind(this));
        this.form.products.addEventListener("keyup", this.handleInputs.bind(this));
        this.form.orders.addEventListener("change", this.handleInputs.bind(this));
        this.form.orders.addEventListener("keyup", this.handleInputs.bind(this));

        // Select
        this.form.package.addEventListener("click", this.handleSelect.bind(this));

        // Checkboxes
        this.form.accounting.addEventListener("change", this.handleCheckbox.bind(this));
        this.form.terminal.addEventListener("change", this.handleCheckbox.bind(this));
    }

    updateTotalPrice() {
        const show = this.summary.list.querySelectorAll(".open").length > 0;

        if (show) {
            const productSum = this.form.products.value < 0 ? 0 : this.form.products.value * this.prices.products;
            const ordersSum = this.form.orders.value < 0 ? 0 : this.form.orders.value * this.prices.orders;
            const packagePrice = this.form.package.dataset.value.length === 0 ? 0 : this.prices.package[this.form.package.dataset.value];
            const accounting = this.form.accounting.checked ? this.prices.accounting : 0;
            const terminal = this.form.terminal.checked ? this.prices.terminal : 0;

            this.summary.total.price.innerText = "$" + (productSum + ordersSum + packagePrice + accounting + terminal);

            this.summary.total.container.classList.add("open");
        } else {
            this.summary.total.container.classList.remove("open");
        }
    }
}

const form = document.querySelector('.calc__form');
const summary = document.querySelector('.calc__summary');
const calculator = new Calculator(form, summary);
calculator.handleListeners();
console.log(calculator);