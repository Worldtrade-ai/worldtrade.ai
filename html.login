<!DOCTYPE html>
<html>
<head>
  <title>DivaS Trader</title>
  <script src="https://cdn.jsdelivr.net/npm/ethers/dist/ethers.min.js"></script>
</head>
<body>

<h2>Login</h2>
<input id="email">
<input id="pass" type="password">
<button onclick="login()">Login</button>

<h2>API Keys</h2>
<input id="apiKey" placeholder="Binance API Key">
<input id="apiSecret" placeholder="Secret">
<button onclick="saveKeys()">Save Keys</button>

<h2>Trade</h2>
<input id="symbol" value="BTCUSDT">
<input id="qty" placeholder="0.001">
<button onclick="buy()">BUY</button>
<button onclick="sell()">SELL</button>

<h2>Wallet</h2>
<button onclick="connect()">Connect Wallet</button>
<p id="wallet"></p>

<h2>Portfolio</h2>
<button onclick="portfolio()">Load</button>
<pre id="port"></pre>

<script>
const API="http://localhost:3000";
let token="";

// LOGIN
async function login(){
  const res = await fetch(API+"/login",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({email:email.value,password:pass.value})
  });
  const data = await res.json();
  token=data.token;
}

// SAVE KEYS
async function saveKeys(){
  await fetch(API+"/keys",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "Authorization":token
    },
    body:JSON.stringify({
      apiKey:apiKey.value,
      apiSecret:apiSecret.value
    })
  });
}

// TRADE
async function buy(){
  await trade("BUY");
}
async function sell(){
  await trade("SELL");
}
async function trade(side){
  const res = await fetch(API+"/trade",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "Authorization":token
    },
    body:JSON.stringify({
      symbol:symbol.value,
      side,
      quantity:qty.value
    })
  });
  console.log(await res.json());
}

// PORTFOLIO
async function portfolio(){
  const res = await fetch(API+"/portfolio",{headers:{Authorization:token}});
  port.innerText = JSON.stringify(await res.json(),null,2);
}

// WALLET
async function connect(){
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts",[]);
  const signer = provider.getSigner();
  wallet.innerText = await signer.getAddress();
}
</script>

</body>
</html>
