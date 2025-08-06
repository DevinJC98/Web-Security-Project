const form = document.getElementById("loginform");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  console.log("attempting login");
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const csrfToken = document
    .querySelector('meta[name="csrfToken"]')
    .getAttribute("content");

  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "CSRF-Token": csrfToken,
      },
      body: JSON.stringify({ username, password }),
    });

    console.log(response.status);

    if (!response.ok) {
      console.error("Login Failed");
      return;
    }

    const data = await response.json();
    const token = data.token;

    if (!token) {
      console.error("No token recieved");
      return;
    }
    console.log(data);
    localStorage.setItem("authToken", token);

    window.location.href = "/user-dashboard";
  } catch (err) {
    console.error(err);
  }
});
