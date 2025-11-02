const baseUrl = "http://localhost:3000/api";

function registerUser() {
  const username = document.getElementById("regUsername").value;
  const password = document.getElementById("regPassword").value;

  fetch(`${baseUrl}/login/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  })
    .then(res => res.json())
    .then(data => alert(data.message))
    .catch(err => console.error("Registration error:", err));
}

function loginUser() {
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  })
    .then(res => res.json())
    .then(data => {
      if (data.token) {
        localStorage.setItem("username", username);
        alert("Login successful");
        window.location.href = "cart.html";
      } else {
        alert("Login failed");
      }
    })
    .catch(err => console.error("Login error:", err));
}
