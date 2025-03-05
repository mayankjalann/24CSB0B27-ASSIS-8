// script.js

const cart = {
    items: [],
    addItem: function(item) {
        item.timestamp = new Date().toLocaleString(); // Add timestamp
        this.items.push(item);
        this.updateCartDisplay();
        this.saveCartToLocalStorage();
    },
    updateCartDisplay: function() {
        const cartIcon = document.querySelector('.nav-icon .text');
        cartIcon.textContent = `Cart (${this.items.length})`;
    },
    saveCartToLocalStorage: function() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    },
    loadCartFromLocalStorage: function() {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            this.items = JSON.parse(savedCart);
            this.updateCartDisplay();
        }
    }
};

cart.loadCartFromLocalStorage();

function Product(title, price, image) {
    this.title = title;
    this.price = price;
    this.image = image;
}

function addToCart(product) {
    cart.addItem(product);
}

document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.box-button:first-child');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const box = this.closest('.box');
            const title = box.querySelector('.box-title').textContent;
            const price = box.querySelector('.box-price').textContent;
            const image = box.querySelector('.box-image').style.backgroundImage;

            const product = new Product(title, price, image);
            addToCart(product);
        });
    });

    const cartIcon = document.querySelector('.nav-icon .text');
    cartIcon.addEventListener('click', function() {
        window.location.href = 'cart.html';
    });
});
