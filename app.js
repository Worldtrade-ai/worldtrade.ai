// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";    

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANwVCPlAnCRqkOIyRLXP4fn-X2psonZ5",
  authDomain: "worldtrade-f1f58.firebaseapp.com",
  projectId: "worldtrade-f1f58.firebaseapp.com",
  appId: "1:11998255908:web:844cf4cc02a12c85a0f1b1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Helper function to get input values
function getInputs() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Please enter email and password.");
    return null;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters.");
    return null;
  }

  return { email, password };
}

// SIGN UP FUNCTION
window.signUp = async function () {
  const data = getInputs();
  if (!data) return;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    alert("Account created successfully!");
    console.log("User:", userCredential.user);

  } catch (error) {
    console.error(error);

    if (error.code === "auth/email-already-in-use") {
      alert("Email already registered.");
    } else {
      alert("Signup error: " + error.message);
    }
  }
};

// LOGIN FUNCTION
window.login = async function () {
  const data = getInputs();
  if (!data) return;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    alert("Login successful!");
    console.log("User:", userCredential.user);

    // redirect to dashboard
    window.location.href = "dashboard.html";

  } catch (error) {
    console.error(error);

    if (error.code === "auth/invalid-credential") {
      alert("Invalid email or password.");
    } else {
      alert("Login error: " + error.message);
    }
  }
};

// Auto-detect login
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User already logged in:", user.email);
  } else {
    console.log("No user logged in.");
  }
});
function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email === "" || password === "") {
    alert("Please fill all fields");
    return;
  }

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      alert("Signup success!");
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      alert(error.message);
    });
}
fetch('settings.json')
  .then(res => res.json())
  .then(settings => {

    // 🏷 App Name
    document.getElementById("appName").innerText = settings.app.name;

    // 👤 Username
    document.getElementById("username").innerText = settings.user.defaultName;

    // 💰 Balance
    document.getElementById("balance").innerText = settings.user.balance;

    // 🎨 Theme
    if (settings.app.theme === "dark") {
      document.body.style.background = "#0D0D0D";
      document.body.style.color = "white";
    }

    // 📊 Show / Hide Chart
    if (!settings.features.showChart) {
      document.getElementById("chart").style.display = "none";
    }

    // 💰 Show / Hide Wallet
    if (!settings.features.showWallet) {
      document.getElementById("wallet").style.display = "none";
    }

    // 🚫 Disable Trading
    if (!settings.features.tradingEnabled) {
      document.getElementById("tradeBtn").innerText = "Trading Disabled";
      document.getElementById("tradeBtn").disabled = true;
    }

  })
  .catch(err => console.error("Settings load error:", err));
