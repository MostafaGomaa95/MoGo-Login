// debugger;
/*=== User Variables ===*/
var userMailInput = document.getElementById("mailInput");
var userPassInput = document.getElementById("passInput");

var userNameSignup = document.getElementById("nameInputSignUp");
var userMailSignup = document.getElementById("mailInputSignUp");
var userPassSignup = document.getElementById("passInputSignUp");

var loginResult = document.getElementById("loginResult");
var signUpResult = document.getElementById("signUpResult");

var mainpageId = document.getElementById("mainpageId");

var inputs = Array.from(document.querySelectorAll("input"));

//flag to check if the inputs regex are valid
var isCorrectUserInput = false;

var usersList = [];
/*=== Local Storage ===*/
var sKey = "Users";
var localData = JSON.parse(localStorage.getItem(sKey));
if (localData != null) {
  usersList = localData;
}
function setStorage(k, list) {
  var listAsString = JSON.stringify(list);
  localStorage.setItem(k, listAsString);
}
/*=== Buttons Variables ===*/
var loginBtn = document.getElementById("loginBtn");
var signupBtn = document.getElementById("signupBtn");
var logoutBtn = document.getElementById("logoutBtn");

/*=== Methods ===*/

// Validations
function checkMail(mail) {
  var userObj = usersList.find(
    (obj) => obj.Mail.toLowerCase() === mail.toLowerCase()
  );
  return userObj;
}
function checkPass(pass, userObj) {
  return pass === userObj.Pass;
}

function validateInput(element) {
  if (!element) return false;
  var regex = {
    nameInputSignUp: /^[A-Z][a-zA-Z]{3,}$/,
    mailInput: /^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/,
    mailInputSignUp: /^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/,
    passInputSignUp:
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9\s])[^\s]{8,}$/,
    passInput: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9\s])[^\s]{8,}$/,
  };
  const valId = regex[element.id];
  if (!valId) return false;
  return valId.test(element.value);
}
function runInputsValidation() {
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("input", function () {
      isCorrectUserInput = validateInput(this);
      this.classList.toggle("is-valid", isCorrectUserInput);
      this.classList.toggle("is-invalid", !isCorrectUserInput);
      this.nextElementSibling.classList.toggle("d-none", isCorrectUserInput);
    });
  }
}
function resetInputsValidayions() {
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].classList.remove("is-valid");
    inputs[i].classList.remove("is-invalid");
  }
}

// Login & Signup
function logIn() {
  var mail = userMailInput.value;
  var pass = userPassInput.value;
  var obj = checkMail(mail);
  var errorMsg;
  if (obj) {
    if (checkPass(pass, obj)) {
      setStorage("LoggedUser", obj.Name);
      window.location.href = "mainPage.html";
      
    } else {
      errorMsg = "Incorrect password.";
    }
  } else {
    errorMsg = "Email not found.";
  }

  if (errorMsg) {
    loginResult.innerHTML = errorMsg;
  }
}

function createUser() {
  user = {
    Name: userNameSignup.value,
    Mail: userMailSignup.value,
    Pass: userPassSignup.value,
  };
  return user;
}
function signUp() {
  // Check if email already exists
  if (checkMail(userMailSignup.value)) {
    signUpResult.firstElementChild.classList.replace(
      "text-success",
      "text-danger"
    );
    signUpResult.firstElementChild.innerText = "Email already exists.";
    return;
  }
  // Add new user
  usersList.push(createUser());
  setStorage(sKey, usersList);
  userNameSignup.value = "";
  userMailSignup.value = "";
  userPassSignup.value = "";
  signUpResult.firstElementChild.classList.replace(
    "text-danger",
    "text-success"
  );
  signUpResult.firstElementChild.innerText = "Success, You can log in now.";
  resetInputsValidayions();
}

/*=== Events ===*/
runInputsValidation();

if (loginBtn) {
  loginBtn.addEventListener("click", function (e) {
    if (isCorrectUserInput) {
      logIn();
    }
  });
}

if (signupBtn) {
  signupBtn.addEventListener("click", function () {
    if (
      userNameSignup.value === "" ||
      userMailSignup.value === "" ||
      userPassSignup.value === "" ||
      !isCorrectUserInput
    ) {
      return;
    }
    signUp();
  });
}

if( mainpageId ){
    var loggedUser = localStorage.getItem("LoggedUser");
    mainpageId.innerHTML = `Welcome ${loggedUser}`;
    localStorage.removeItem("LoggedUser");
}
if (logoutBtn) {
  logoutBtn.addEventListener("click", function () {
    window.location.href = "index.html";
  });
}
