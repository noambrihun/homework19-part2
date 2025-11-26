function createOrder() {
  const data = {
    user: document.getElementById("user").value,
    totalProducts: document.getElementById("productCount").value,
    totalPrice: document.getElementById("totalPrice").value
  };

  fetch("/api/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById("result").innerText = JSON.stringify(data, null, 2);
    alert("Order completed successfully! ");
  })
  .catch(err => console.error(err));
}
