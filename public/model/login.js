import adminsToServer from "../controller/adminsHandler.js"

window.onload = async () => {
   const formInputs = document.querySelector('.logInForm')
   formInputs.addEventListener('submit', adminsServer);
   console.log("Loaded")

}

async function adminsServer(e) {
    e.preventDefault()
    console.log("Submit pressed");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const email = emailInput.value;
    const password = passwordInput.value;
    console.log(email);
    console.log(password);
    const res = await adminsToServer.sendAdmin(email, password);
    if (res.success) {
      window.location.href = "/reports.html";
    } else {
        const errorBox = document.getElementById("error-box");
        errorBox.classList.remove("hidden");
      emailInput.value = "";
      passwordInput.value = "";
      console.log("User is not authorized");
    }
    console.log(res);
  }
  