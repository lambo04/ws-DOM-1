// Wait for the DOM to fully load before running the script
document.addEventListener("DOMContentLoaded", function () {
  // Select the element to display the total price
  let totalPriceElement = document.querySelector(".total");
  // Select all product cards to iterate through them
  let productCards = document.querySelectorAll(".card");

  // Function to update the total price based on quantities and unit prices
  function updateTotalPrice() {
    let totalPrice = 0;
    productCards.forEach((card) => {
      // Get the quantity and price for each product
      let quantity = parseInt(card.querySelector(".quantity").innerText) || 0;
      let price = parseFloat(card.querySelector(".unit-price").innerText);
      // Calculate the total price
      totalPrice += quantity * price;
    });
    // Display the total price with two decimal places
    totalPriceElement.innerText = totalPrice.toFixed(2) + " $";
  }

  // Loop through each product card to add functionality
  productCards.forEach((card) => {
    // Get elements for quantity, buttons, and actions
    let quantityElement = card.querySelector(".quantity");
    let increaseButton = card.querySelector(".increase");
    let decreaseButton = card.querySelector(".decrease");
    let deleteButton = card.querySelector(".delete");
    let likeButton = card.querySelector(".like");

    let quantity = 0; // Initialize quantity for each product

    // Event listener for increasing quantity
    increaseButton.addEventListener("click", function () {
      quantity++;
      quantityElement.innerText = quantity;
      updateTotalPrice(); // Update the total price after change
    });

    // Event listener for decreasing quantity
    decreaseButton.addEventListener("click", function () {
      if (quantity > 0) { // Ensure quantity doesn't go below zero
        quantity--;
        quantityElement.innerText = quantity;
        updateTotalPrice(); // Update the total price after change
      }
    });

    // Event listener for deleting the product card
    deleteButton.addEventListener("click", function () {
      card.remove(); // Remove the card from the DOM
      updateTotalPrice(); // Update the total price after deletion
    });

    // Event listener for liking/unliking the product
    likeButton.addEventListener("click", function () {
      likeButton.classList.toggle("active"); // Toggle the "active" class
    });
  });
});

// Handle like button styling for each heart icon
const hearts = document.querySelectorAll(".fa-heart");
hearts.forEach((heart) => {
  heart.addEventListener("click", () => {
    heart.classList.toggle("liked"); // Toggle the "liked" class
  });
});

// Function to update the cart count display
function updateCartCount() {
  let totalQuantity = 0;
  const quantities = document.querySelectorAll(".quantity");

  // Calculate the sum of all quantities
  quantities.forEach((quantityElement) => {
    totalQuantity += parseInt(quantityElement.textContent);
  });

  // Display the total quantity in the cart count element
  document.getElementById("cart-count").textContent = totalQuantity;
}

// Event listeners for quantity increase buttons
document.querySelectorAll(".fa-plus-circle").forEach((button) => {
  button.addEventListener("click", () => {
    const quantityElement = button.nextElementSibling;
    quantityElement.textContent = parseInt(quantityElement.textContent) + 1;
    updateCartCount(); // Update cart count after change
  });
});

// Event listeners for quantity decrease buttons
document.querySelectorAll(".fa-minus-circle").forEach((button) => {
  button.addEventListener("click", () => {
    const quantityElement = button.previousElementSibling;
    const currentQuantity = parseInt(quantityElement.textContent);
    if (currentQuantity > 0) { // Ensure quantity doesn't go below zero
      quantityElement.textContent = currentQuantity - 1;
      updateCartCount(); // Update cart count after change
    }
  });
});

// Event listeners for delete buttons to reset quantity and update cart count
document.querySelectorAll(".fa-trash-alt").forEach((trash) => {
  trash.addEventListener("click", () => {
    const quantityElement = trash.closest(".card-body").querySelector(".quantity");
    quantityElement.textContent = 0; // Reset quantity to zero
    updateCartCount(); // Update cart count after deletion
  });
});
