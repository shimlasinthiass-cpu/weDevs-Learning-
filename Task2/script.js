let productList = document.querySelector("#productList");
let loadMoreBtn = document.querySelector("#loadMoreBtn");

let cartCount = document.querySelector("#cartCount");
let cartSubtotal = document.querySelector("#cartSubtotal");
let cartTotal = document.querySelector("#cartTotal");

let discountCard = document.querySelector("#discountCard");
let discountRow = document.querySelector("#discountRow");
let discountAmount = document.querySelector("#discountAmount");
let discountPreview = document.querySelector("#discountPreview");

let confirmationOverlay = document.querySelector("#confirmationOverlay");

let cart = [];
let products = [];
let productNumber = 0;
let visibleCount = 5;
let discountDone = false;
let discountProduct = null;

window.onload = function () {
    fetch("./data.json")
        .then(response => response.json())
        .then(data => {
            products = data;
            showProducts();
        });
    loadMoreBtn.onclick = loadMore;
    discountCard.onclick = applyDiscount;
};

function showProducts() {
    productList.innerHTML = "";

    for (let i = 0; i < visibleCount && i < products.length; i++) {
        let p = products[i];

        let inCart = cart.indexOf(p.id) >= 0;
        let cardClass = "product-card";
        let btnClass = inCart ? "toggle-btn remove-btn" : "toggle-btn add-btn";
        let btnText = inCart ? "x" : "+";

        productList.innerHTML +=
            '<div class="' + cardClass + '">' +
            ' <div class="product-icon">P' + (i + 1) + '</div>' +
            ' <div class="product-info">' +
            '  <h3 class="product-name">' + p.name + '</h3>' +
            '  <p class="product-meta">Some info about this Product</p>' +
            '  <span class="product-price">$' + p.price.toFixed(2) + '</span>' +
            ' </div>' +
            ' <button class="' + btnClass + '" onclick="toggleCart(\'' + p.id + '\')">' + btnText + '</button>' +
            '</div>';
    }
}

function toggleCart(id) {
    let index = cart.indexOf(id);
    console.log(index);
    if (index >= 0) {
        cart.splice(index, 1);
    } else {
        cart.push(id);
    }
    console.log(cart);

    updateCart();
    showProducts();
    showDiscountCard();
}

function updateCart() {
    let count = cart.length;
    let subtotal = 0;
    for (let i = 0; i < cart.length; i++) {
        let p = findProduct(cart[i]);
        if (p) subtotal += p.price;
    }
    let total = subtotal;
    if (discountDone && discountProduct) {
        count++;
        let disc = discountProduct.price * 0.5;
        total += discountProduct.price - disc;
        subtotal += discountProduct.price;
        discountAmount.textContent = disc.toFixed(2);
        discountRow.className = "summary-row discount-row";
    } else {
        discountRow.className = "summary-row discount-row hidden";
    }

    cartCount.textContent = count;
    cartSubtotal.textContent = subtotal.toFixed(2);
    cartTotal.textContent = total.toFixed(2);
}

function findProduct(id) {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === id) return products[i];
    }
    return null;
}

function showDiscountCard() {
    if (cart.length === 0 || discountDone) {
        discountCard.className = "card discount-card hidden";
        return;
    }

    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        let p = findProduct(cart[i]);
        if (p) total += p.value;
    }
    let avg = Math.floor(total / cart.length);
    let closest = null;
    let minDiff = 99999;
    for (let i = 0; i < visibleCount; i++) {
        let diff = Math.abs(products[i].value - avg);
        if (diff < minDiff) {
            minDiff = diff;
            closest = products[i];
        }
    }
    if (closest) {
        discountProduct = closest;
        let newPrice = closest.price * 0.5;
        let num = closest.name.replace("Product ", "");
        discountPreview.innerHTML =
            '<div class="preview-content">' +
            ' <div class="preview-icon">P' + num + '</div>' +
            ' <div class="preview-info">' +
            '  <p class="preview-name">' + closest.name + '</p>' +
            '  <p><span class="original">$' + closest.price.toFixed(2) + '</span> ' +
            '  <span class="discounted">$' + newPrice.toFixed(2) + '</span></p>' +
            ' </div>' +
            '</div>';
        discountCard.className = "card discount-card";
    }
}

function loadMore() {
    visibleCount += 5;

    if (visibleCount >= products.length) {
        visibleCount = products.length;
        loadMoreBtn.innerHTML = "No More Products";
        loadMoreBtn.disabled = true;
    }

    showProducts();
}

function applyDiscount() {
    if (cart.length === 0 || !discountProduct) {
        alert("Add Products First!");
        return;
    }

    discountDone = true;
    discountProduct.hasDiscount = true;
    updateCart();
    discountCard.className = "card discount-card hidden";
    showProducts();
    setTimeout(showConfirmation, 2000);
}

function showConfirmation() {
    confirmationOverlay.className = "overlay";
    setTimeout(function () {
        confirmationOverlay.className = "overlay hidden";
        resetApp();
    }, 2500);
}

function resetApp() {
    cart = [];
    productNumber = 0;
    visibleCount = 5;
    discountDone = false;
    discountProduct = null;

    loadMoreBtn.innerHTML = "Load More";
    loadMoreBtn.disabled = false;

    for (let i = 0; i < products.length; i++) {
        products[i].hasDiscount = false;
    }

    showProducts();
    updateCart();
    showDiscountCard();
    window.scrollTo(0, 0);
}
