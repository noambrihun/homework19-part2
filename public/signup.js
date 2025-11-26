function signup() {
  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value
  };

  fetch("/api/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById("result").innerText = JSON.stringify(data, null, 2);

      if (data.ok) {
        alert("Account created successfully!");
        location.href = "signin.html";   
      } else {
        alert("Error creating account");
      }
    })
    .catch(err => console.error(err));
}
