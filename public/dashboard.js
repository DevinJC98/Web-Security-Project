const token = localStorage.getItem("authToken");
const csrfToken = document
  .querySelector('meta[name="csrfToken"]')
  .getAttribute("content");

if (!token) {
  window.location.href = "/";
}

const payload = token.split(".")[1];
const decodedPayload = JSON.parse(atob(payload));

const activeUser = decodedPayload.username;
const textbox = decodedPayload.textbox;

welcomeMessage.innerHTML = `Welcome ${activeUser}`;
userText.innerHTML = textbox;

console.log(token);

const updateform = document.getElementById("updateForm");
updateform.addEventListener("submit", async (event) => {
  const nameUpdate = document.getElementById("nameUpdate").value;
  const emailUpdate = document.getElementById("emailUpdate").value;
  const textboxUpdate = document.getElementById("textboxUpdate").value;

  event.preventDefault();

  const updatedData = {
    username: nameUpdate,
    email: emailUpdate,
    textbox: textboxUpdate,
  };

  //clear empty sections
  for (let key in updatedData) {
    if (!updatedData[key]) {
      delete updatedData[key];
    }
  }

  if (Object.keys(updatedData).length === 0) {
    alert("No changes have been made");
    return;
  }

  //try to update the api endpoint
  try {
    const response = await fetch("/api/auth/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });
    const result = await response.json();

    //if the update works, clear the token and direct the user to the login page. this is because the information displayed on the dashboard is reliant on the token, and the information will need to be refreshed.
    if (response.ok) {
      console.log("response ok");
      localStorage.removeItem("authToken");
      console.log("token cleared, returning to login.");
      window.location.href = "/";
    }
  } catch (err) {
    console.error(err);
  }
});
