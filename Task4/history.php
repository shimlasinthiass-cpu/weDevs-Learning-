<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Cart History</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

<nav class="navbar">
  <div class="nav-left">
    <img src="weDevsLogo.jpg" alt="WeDevs Logo" class="nav-logo" />
    <h2 class="brand">weDevs</h2>
    <a href="index.php" class="back-btn">⬅ Back</a>
  </div>
</nav>

<main class="history-container">
  <h1 class="history-title">Order History</h1>
  <div id="historyList" class="history-list"></div>
</main>

<script>
fetch("get_orders.php")
  .then(res => res.json())
  .then(history => {
    const historyList = document.getElementById("historyList");

    if (history.length === 0) {
      historyList.innerHTML = `<p class="empty-text">No order history found.</p>`;
      return;
    }

    history.forEach(order => {
      const card = document.createElement("div");
      card.className = "history-card";

      card.innerHTML = `
        <div class="history-header">
          <span class="order-id">${order.order_id}</span>
          <span class="order-date">${order.created_at}</span>
        </div>

        <div class="history-items">
          ${order.items.map(item => `
            <div class="history-item">
              <span>${item.name}</span>
              ${
                item.discounted
                  ? `<span><s>$${item.original_price}</s> <strong>$${item.price}</strong></span>`
                  : `<strong>$${item.price}</strong>`
              }
            </div>
          `).join("")}
        </div>

        <div class="history-summary">
          <div><span>Subtotal</span><span>$${order.subtotal}</span></div>
          <div><span>Discount</span><span>-$${order.discount}</span></div>
          <div class="total">
            <span>Total</span>
            <span>$${order.total}</span>
          </div>
        </div>
      `;

      historyList.appendChild(card);
    });
  });
</script>


</body>
</html>
