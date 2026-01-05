<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Product Cart - weDevs</title>
  <link rel="stylesheet" href="style.css">
</head>

<body>

  <nav class="navbar">
    <div class="nav-left">
      <img src="weDevsLogo.jpg" alt="WeDevs Logo" class="nav-logo" />
      <h2 class="brand">weDevs</h2>
    </div>

    <div class="nav-right">
      <div class="user-profile">Mst Shimla Sinthia</div>
      <button class="logout-btn">Logout</button>
    </div>
  </nav>

  <main class="app-layout">

    <section class="products-column">
      <div class="column-header">
        <h1>Products</h1>
        <p class="subtitle">Click <strong>+</strong> to add, <strong>x</strong> to remove</p>
      </div>

      <div id="productList" class="product-list">
      </div>

      <div class="load-more-wrapper">
        <button id="loadMoreBtn" class="load-more-btn">
          Load More
        </button>
      </div>
    </section>

    <section class="cart-column">

      <div class="card cart-summary-card" id="cartSummaryCard">
        <div class="card-header">
          <span class="card-icon"></span>
          <h3>Cart Summary</h3>
        </div>
        <div class="card-body">
          <div class="summary-row">
            <span class="label">Items in Cart:</span>
            <span class="value" id="cartCount">0</span>
          </div>
          <div class="summary-row">
            <span class="label">Subtotal:</span>
            <span class="value">$<span id="cartSubtotal">0.00</span></span>
          </div>
          <div class="summary-row discount-row hidden" id="discountRow">
            <span class="label">Discount (50%):</span>
            <span class="value discount-value">-$<span id="discountAmount">0.00</span></span>
          </div>
          <hr class="divider">
          <div class="summary-row total-row">
            <span class="label">Total:</span>
            <span class="value total-value">$<span id="cartTotal">0.00</span></span>
          </div>
        </div>
      </div>

      <div class="card discount-card hidden" id="discountCard">
        <div class="discount-content">
          <h2 class="discount-title">Special Discount!</h2>
          <p class="discount-desc">Click to apply <strong>50% OFF</strong> on a special product and complete
            your order</p>

          <div class="discount-preview" id="discountPreview">
          </div>

          <button class="apply-btn">Apply Discount & Order</button>
        </div>
      </div>

    </section>

  </main>

  <div id="confirmationOverlay" class="overlay hidden">
    <div class="overlay-content">
      <div class="success-icon">✓</div>
      <h1>THANK YOU!</h1>
      <p>Your Order is Confirmed!</p>
      <p class="redirect-text">Resetting...</p>
    </div>
  </div>

  <script src="script.js"></script>
</body>

</html>
