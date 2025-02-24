const cart = {};
function updateCartDisplay() {
  const cartItemsContainer = document.querySelector(".cart-items");
  const cartTitle = document.querySelector(".cart-title");
  const orderTotal = document.querySelector(".order-total");
  cartItemsContainer.innerHTML = "";
  let totalCost = 0;
  let totalItems = 0;
  for (let itemName in cart) {
    if (cart[itemName].quantity > 0) {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("cart-item");
      const nameSpan = document.createElement("span");
      nameSpan.classList.add("cart-item-name");
      nameSpan.textContent = itemName;
      const infoSpan = document.createElement("span");
      infoSpan.classList.add("cart-item-info");
      const cost = cart[itemName].quantity * cart[itemName].price;
      infoSpan.textContent = cart[itemName].quantity + " x $" + cart[itemName].price.toFixed(2) + " = $" + cost.toFixed(2);
      itemDiv.appendChild(nameSpan);
      itemDiv.appendChild(infoSpan);
      cartItemsContainer.appendChild(itemDiv);
      totalCost += cost;
      totalItems += cart[itemName].quantity;
    }
  }
  cartTitle.textContent = "Your Cart (" + totalItems + ")";
  orderTotal.textContent = "Order Total: $" + totalCost.toFixed(2);
}
function handleAddToCart(e) {
  const button = e.currentTarget;
  const itemName = button.dataset.name;
  const itemPrice = parseFloat(button.dataset.price);
  if (!cart[itemName]) {
    cart[itemName] = { price: itemPrice, quantity: 0 };
  }
  if (!button.classList.contains("in-cart")) {
    button.classList.add("in-cart");
    button.innerHTML = "";
    const quantityContainer = document.createElement("div");
    quantityContainer.classList.add("quantity-container");
    const minusIcon = document.createElement("img");
    minusIcon.src = "icon-decrement-quantity.svg";
    minusIcon.alt = "Decrease quantity";
    const plusIcon = document.createElement("img");
    plusIcon.src = "icon-increment-quantity.svg";
    plusIcon.alt = "Increase quantity";
    const quantityText = document.createElement("span");
    quantityText.textContent = cart[itemName].quantity;
    minusIcon.addEventListener("click", (ev) => {
      ev.stopPropagation();
      if (cart[itemName].quantity > 0) {
        cart[itemName].quantity--;
        quantityText.textContent = cart[itemName].quantity;
        updateCartDisplay();
      }
    });
    plusIcon.addEventListener("click", (ev) => {
      ev.stopPropagation();
      cart[itemName].quantity++;
      quantityText.textContent = cart[itemName].quantity;
      updateCartDisplay();
    });
    quantityContainer.appendChild(minusIcon);
    quantityContainer.appendChild(quantityText);
    quantityContainer.appendChild(plusIcon);
    button.appendChild(quantityContainer);
  }
  updateCartDisplay();
}
document.querySelectorAll(".add-item").forEach((btn) => {
  btn.addEventListener("click", handleAddToCart);
});
document.querySelector(".confirm-order").addEventListener("click", () => {
  alert("Order confirmed");
});