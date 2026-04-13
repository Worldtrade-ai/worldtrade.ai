// Check if user is logged in
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    document.getElementById("userEmail").innerText = user.email;
  } else {
    // Not logged in → go back to login page
    window.location.href = "login.html";
  }
});
