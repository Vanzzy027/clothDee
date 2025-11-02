const baseUrl = "http://localhost:3000/api";

function submitAddress() {
  const username = localStorage.getItem("username");
  const address = document.getElementById("addressInput").value;

  if (!username || !address) {
    alert("Please log in and enter your address.");
    return;
  }

  // Save address
  fetch(`${baseUrl}/address`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, address }),
  })
    .then(res => res.json())
    .then(data => {
      console.log("Address saved:", data);

      // Retrieve cart from cookies
      const cookie = document.cookie;
      const orderId = cookie.split(",")[0].split("=")[1].split(" ");
      const counter = Number(cookie.split(",")[1].split("=")[1]);

      const cartItems = [];
      for (let i = 0; i < counter; i++) {
        let itemCounter = 1;
        for (let j = i + 1; j < counter; j++) {
          if (Number(orderId[j]) === Number(orderId[i])) {
            itemCounter += 1;
          }
        }
        cartItems.push({ id: orderId[i], quantity: itemCounter });
        i += itemCounter - 1;
      }

      // Submit order
      fetch(`${baseUrl}/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          cart: cartItems,
          total: localStorage.getItem("totalAmount") || 0,
        }),
      })
        .then(res => res.json())
        .then(data => {
          alert("Order placed successfully!");
          window.location.href = "orderPlaced.html";
        });
    })
    .catch(err => console.error("Checkout error:", err));
}
