function loadProducts() {
  fetch("/api/products")
    .then(res => res.json())
    .then(data => {
      const div = document.getElementById("products");
      div.innerHTML = ""; 

      data.products.forEach(p => {
        div.innerHTML += `<p> ${p.name} — ${p.price}₪</p>`;
      });
    })
    .catch(err => console.log(err));
}

function goToOrder() {
  window.location.href = "order.html"; 
}

loadProducts();
