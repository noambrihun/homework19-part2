function signIn() {
  const data = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value
  };

  fetch("/api/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(data => {
    if (data.ok) {
      alert("Login success!");
      location.href = "products.html";  
    } else {
      alert("Wrong email or password!");
    }
  })
  .catch(err => console.error(err));
}
