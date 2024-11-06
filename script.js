document.addEventListener("DOMContentLoaded", function () {
  let totalPriceElement = document.querySelector(".total");
  let productCards = document.querySelectorAll(".card");

  function updateTotalPrice() {
    let totalPrice = 0;
    productCards.forEach((card) => {
      let quantity = parseInt(card.querySelector(".quantity").innerText) || 0;
      let price = parseFloat(card.querySelector(".unit-price").innerText);
      totalPrice += quantity * price;
    });
    totalPriceElement.innerText = totalPrice.toFixed(2) + " $";
  }

  productCards.forEach((card) => {
    let quantityElement = card.querySelector(".quantity");
    let increaseButton = card.querySelector(".increase");
    let decreaseButton = card.querySelector(".decrease");
    let deleteButton = card.querySelector(".delete");
    let likeButton = card.querySelector(".like");

    let quantity = 0;

    increaseButton.addEventListener("click", function () {
      quantity++;
      quantityElement.innerText = quantity;
      updateTotalPrice();
    });

    decreaseButton.addEventListener("click", function () {
      if (quantity > 0) {
        quantity--;
        quantityElement.innerText = quantity;
        updateTotalPrice();
      }
    });

    deleteButton.addEventListener("click", function () {
      card.remove();
      updateTotalPrice();
    });

    likeButton.addEventListener("click", function () {
      likeButton.classList.toggle("active");
    });
  });
});
const hearts = document.querySelectorAll(".fa-heart");

hearts.forEach((heart) => {
  heart.addEventListener("click", () => {
    heart.classList.toggle("liked");
  });
});

function updateCartCount() {
  let totalQuantity = 0;
  const quantities = document.querySelectorAll(".quantity");

  quantities.forEach((quantityElement) => {
    totalQuantity += parseInt(quantityElement.textContent);
  });

  document.getElementById("cart-count").textContent = totalQuantity;
}

document.querySelectorAll(".fa-plus-circle").forEach((button) => {
  button.addEventListener("click", () => {
    const quantityElement = button.nextElementSibling;
    quantityElement.textContent = parseInt(quantityElement.textContent) + 1;
    updateCartCount();
  });
});

document.querySelectorAll(".fa-minus-circle").forEach((button) => {
  button.addEventListener("click", () => {
    const quantityElement = button.previousElementSibling;
    const currentQuantity = parseInt(quantityElement.textContent);
    if (currentQuantity > 0) {
      quantityElement.textContent = currentQuantity - 1;
      updateCartCount();
    }
  });
});

document.querySelectorAll(".fa-trash-alt").forEach((trash) => {
  trash.addEventListener("click", () => {
    const quantityElement = trash
      .closest(".card-body")
      .querySelector(".quantity");
    quantityElement.textContent = 0;
    updateCartCount();
  });
});
