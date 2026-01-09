function generateOrderId() {
  return "ORD-" + Date.now();
}

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
    fetch("./products.php")
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
        // let inCart = cart.indexOf(p.id) >= 0;

        let inCart = cart.includes(String(p.id));
        let cardClass = "product-card";
        let btnClass = inCart ? "toggle-btn remove-btn" : "toggle-btn add-btn";
        let btnText = inCart ? "x" : "+";

        productList.innerHTML +=
            '<div class="' + cardClass + '">' +
            ' <div class="product-icon">P' + (i + 1) + '</div>' +
            ' <div class="product-info">' +
            '  <h3 class="product-name">' + p.name + '</h3>' +
            '  <p class="product-meta">Some info about this Product</p>' +
            '  <span class="product-price">$' + Number(p.price).toFixed(2) + '</span>' +
            ' </div>' +
            ' <button class="' + btnClass + '" onclick="toggleCart(\'' + p.id + '\')">' + btnText + '</button>' +
            '</div>';
    }
}

function toggleCart(id) {
    let index = cart.indexOf(id);
    // console.log("cart index", index);
    if (index >= 0) {
        cart.splice(index, 1);
    } else {
        cart.push(id);
    }
    console.log("Current cart", cart);

    updateCart();
    showProducts();
    showDiscountCard();
}

function updateCart() {
    let count = cart.length;
    let subtotal = 0;
    for (let i = 0; i < cart.length; i++) {
        let p = findProduct(cart[i]);
        if (p) subtotal += Number(p.price);
    }
    // console.log("Subtotal", subtotal);

    let total = subtotal;

    if (discountDone && discountProduct) {
        count += 1;
        let disc = Number(discountProduct.price) / 2;
        total += Number(discountProduct.price) - disc;
        subtotal += Number(discountProduct.price);
        discountAmount.textContent = Number(disc).toFixed(2);
        discountRow.className = "summary-row discount-row";
    } else {
        discountRow.className = "summary-row discount-row hidden";
    }
    
    cartCount.textContent = count;
    cartSubtotal.textContent = Number(subtotal).toFixed(2);
    // console.log("subtotal", subtotal);
    cartTotal.textContent = Number(total).toFixed(2);
}

function findProduct(id) {
    for (let i = 0; i < products.length; i++) {
        if (String(products[i].id) === String(id)) return products[i];
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
        let diff = Math.abs(Number(products[i].value) - avg);
        if (diff < minDiff) {
            minDiff = diff;
            closest = products[i];
        }
    }
    if (closest) {
        discountProduct = closest;
        let newPrice = Number(closest.price) / 2;
        let num = closest.name.replace("Product ", "");
        discountPreview.innerHTML =
            '<div class="preview-content">' +
            ' <div class="preview-icon">P' + num + '</div>' +
            ' <div class="preview-info">' +
            '  <p class="preview-name">' + closest.name + '</p>' +
            '  <p><s>$' + Number(closest.price).toFixed(2) + '</s> ' +
            '  <span class="discounted">$' + Number(newPrice).toFixed(2) + '</span></p>' +
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
    // console.log("Visible Count: " + visibleCount);
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
    saveCartHistory();
    
    cart = [];
    productNumber = 0;
    visibleCount = 5;
    discountDone = false;
    discountProduct = null;

    loadMoreBtn.innerHTML = "Load More";
    loadMoreBtn.disabled = false;

    for (let i = 0; i < visibleCount; i++) {
        products[i].hasDiscount = false;
    }
    
    showProducts();
    updateCart();
    showDiscountCard();
    window.scrollTo(0, 0);
}


function saveCartHistory() {
    let items = cart.map(id => {
        let p = findProduct(id);
        return {
            id: p.id,
            name: p.name,
            price: Number(p.price),
            originalPrice: Number(p.price),
            discounted: false
        };
    });

    if (discountDone && discountProduct) {
        items.push({
            id: discountProduct.id,
            name: discountProduct.name,
            price: Number(discountProduct.price) / 2,
            originalPrice: Number(discountProduct.price),
            discounted: true
        });
    }

    fetch("save_order.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            orderId: generateOrderId(),
            items,
            subtotal: Number(cartSubtotal.textContent),
            discount: discountDone ? Number(discountAmount.textContent) : 0,
            total: Number(cartTotal.textContent)
        })
    })
    .then(res => res.json())
    .then(data => console.log("Order saved:", data))
    .catch(err => console.error(err));
}
