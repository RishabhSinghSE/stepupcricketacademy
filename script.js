window.emailjsPublicKey='8A1srPbKddX75ORGR';
window.emailjsServiceId='service_4t27r3p';
window.emailjsTemplateId='template_p0fpv7p';
emailjs.init({publicKey:window.emailjsPublicKey});
// ===== TELEGRAM CONFIG =====
const TELEGRAM_BOT_TOKEN = "8095993323:AAGbg0B95e5zu4JoYE1zURt92Y0I0tz4hm8";
const TELEGRAM_CHAT_ID = "5104013170";


const ADMIN_EMAIL="yash@admin.com";
const ADMIN_PASS="yash@mishra1";

let players=JSON.parse(localStorage.getItem("players"))||[];
let admissionsOpen=JSON.parse(localStorage.getItem("admissions")) ?? true;

function show(id){
document.querySelectorAll("section").forEach(s=>s.classList.add("hidden"));
document.getElementById(id).classList.remove("hidden");
if(id==="admin")loadTable();
if(id==="signup")checkStatus();
}

function logout(){show("home")}

function checkStatus(){
admissionStatus.innerHTML=admissionsOpen?"":"<div class='error'>Admissions Closed</div>";
signupForm.querySelector("button").disabled=!admissionsOpen;
}

function toggleAdmissions(val){
admissionsOpen=val;
localStorage.setItem("admissions",JSON.stringify(val));
alert(val?"Admissions Opened":"Admissions Closed");
}

loginForm.onsubmit=e=>{
e.preventDefault();
if(adminEmail.value===ADMIN_EMAIL && adminPass.value===ADMIN_PASS){
show("admin");
}else alert("Invalid Login");
};

// signupForm.onsubmit=async e=>{
// e.preventDefault();
// if(!admissionsOpen)return;

// const reg="SCA-"+Date.now().toString().slice(-6);

// const data={
// reg,
// name:name.value,
// age:age.value,
// parent:parentName.value,
// phone:phone.value,
// address:address.value,
// timing:timing.value,
// time:new Date().toLocaleString("en-IN"),
// date:new Date().toLocaleString("en-IN")
// };

// players.push(data);
// localStorage.setItem("players",JSON.stringify(players));

// try{
// await emailjs.send(window.emailjsServiceId,window.emailjsTemplateId,data);
// }catch(e){}

// const proof=`STEPUP CRICKET ACADEMY
// -------------------------
// Registration No: ${reg}

// Name: ${data.name}
// Age: ${data.age}
// Parent: ${data.parent}
// Phone: ${data.phone}
// Timing: ${data.timing}
// Date: ${data.date}

// This receipt is valid as admission proof.
// `;

// const blob=new Blob([proof],{type:"text/plain"});
// const a=document.createElement("a");
// a.href=URL.createObjectURL(blob);
// a.download=`StepUp_${reg}.txt`;
// a.click();

// submitMsg.innerHTML="<div class='success'>Admission Successful! Email sent & proof downloaded.</div>";
// signupForm.reset();
// };

// ================= GPS UTIL =================

// Stores last known coordinates
let lastLocation = null;

// Get GPS coordinates (FREE Browser API)
function getUserCoordinates() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      pos => {
        const lat = pos.coords.latitude.toFixed(6);
        const lon = pos.coords.longitude.toFixed(6);

        lastLocation = {
          lat,
          lon,
          map: `https://maps.google.com/?q=${lat},${lon}`
        };

        resolve(lastLocation);
      },
      err => reject(err.message),
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0
      }
    );
  });
}

// Disable submit button for 10 seconds
function disableSubmit(btn, seconds = 10) {
  btn.disabled = true;
  let t = seconds;
  const originalText = btn.innerText;

  const timer = setInterval(() => {
    btn.innerText = `Please wait ${t}s`;
    t--;
    if (t < 0) {
      clearInterval(timer);
      btn.disabled = false;
      btn.innerText = originalText;
    }
  }, 1000);
}

signupForm.onsubmit = async e => {
  e.preventDefault();
  if (!admissionsOpen) return;

   // ✅ ADD THIS (VERY IMPORTANT)
  let locationData = {
    lat: "N/A",
    lon: "N/A",
    map: "N/A"
  };

  try {
    locationData = await getUserCoordinates();
  } catch (err) {
    console.warn("GPS error:", err);
  }
const submitBtn = signupForm.querySelector("button");
disableSubmit(submitBtn, 10);

  
  const reg = "SCA-" + Date.now().toString().slice(-6);

  const data = {
    reg,
    name: document.getElementById("playerName").value,
    age: age.value,
    parent: parentName.value,
    phone: phone.value,
    address: address.value,
    timing: timing.value,
    // ✅ ADD THESE (GPS DATA)
  latitude: locationData.lat,
  longitude: locationData.lon,
  map: locationData.map,
    
    time: new Date().toLocaleString("en-IN"),
    date: new Date().toLocaleString("en-IN")
  };

  // ✅ Save locally
  players.push(data);
  localStorage.setItem("players", JSON.stringify(players));

  // ✅ Send Email
  try {
    await emailjs.send(
      window.emailjsServiceId,
      window.emailjsTemplateId,
      data
    );
  } catch (e) {
    console.error("EmailJS Error", e);
  }

  // ✅ Send Telegram Message
  const telegramMessage =
`🏏 STEPUP CRICKET ACADEMY
------------------------
🆔 Reg No: ${reg}

👤 Player: ${data.name}
🎂 Age: ${data.age}
👨‍👩‍👦 Parent: ${data.parent}
📞 Phone: ${data.phone}
🏠 Address: ${data.address}
⏰ Timing: ${data.timing}
📅 Date: ${data.date}
📍 Location:
Lat: ${data.latitude}
Lon: ${data.longitude}
🗺️ ${data.map}

✅ New admission received`;

  sendToTelegram(telegramMessage);
  submitMsg.innerHTML =
    "<div class='success'>Admission Successful! Email, Telegram & GPS sent.</div>";

  // ✅ Download TXT Proof
  const proof = `STEPUP CRICKET ACADEMY
-------------------------
Registration No: ${reg}

Name: ${data.name}
Age: ${data.age}
Parent: ${data.parent}
Phone: ${data.phone}
Address: ${data.address}
Timing: ${data.timing}
Date: ${data.date}

This receipt is valid as admission proof.
`;

  const blob = new Blob([proof], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `StepUp_${reg}.txt`;
  a.click();

  submitMsg.innerHTML =
    "<div class='success'>Admission Successful! Email & Telegram notification sent.</div>";

  signupForm.reset();
};

function loadTable(){
tableBody.innerHTML="";
players.forEach(p=>{
const r=tableBody.insertRow();
["reg","name","age","parent","phone","timing","date"].forEach(k=>{
r.insertCell().textContent=p[k];
});
});
}

async function sendToTelegram(message) {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  try {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message
      })
    });
  } catch (error) {
    console.error("Telegram Error:", error);
  }
}


function exportData(type){
let content=type==="csv"
? "Reg,Name,Age,Parent,Phone,Timing,Date\n"+players.map(p=>`${p.reg},${p.name},${p.age},${p.parent},${p.phone},${p.timing},${p.date}`).join("\n")
: JSON.stringify(players,null,2);
const blob=new Blob([content],{type:"text/plain"});
const a=document.createElement("a");
a.href=URL.createObjectURL(blob);
a.download="stepup_data."+type;
a.click();
}

show("home");
