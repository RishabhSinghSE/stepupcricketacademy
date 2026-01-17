let players = JSON.parse(localStorage.getItem("players")) || [];
let admissionsOpen = JSON.parse(localStorage.getItem("admissions")) ?? true;

/* ================= UI ================= */

function show(id){
  document.querySelectorAll("section").forEach(s=>s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
  if(id==="admin") loadTable();
  if(id==="signup") checkStatus();
}
function show(id){
  if(id==="admin" && sessionStorage.getItem("admin")!=="true"){
    alert("Login required");
    return;
  }
  document.querySelectorAll("section").forEach(s=>s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
  if(id==="admin") loadTable();
}


function logout(){
  sessionStorage.removeItem("admin");
  show("home");
}


function checkStatus(){
  admissionStatus.innerHTML = admissionsOpen ? "" : "<div class='error'>Admissions Closed</div>";
  signupForm.querySelector("button").disabled = !admissionsOpen;
}

loginForm.onsubmit = async e => {
  e.preventDefault();

  const res = await fetch("/api/adminLogin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: adminEmail.value,
      password: adminPass.value
    })
  });

  const data = await res.json();

  if (data.success) {
    sessionStorage.setItem("admin", "true");
    show("admin");
  } else {
    alert("Invalid Login");
  }
};

/* ================= GPS ================= */

function getUserCoordinates(){
  return new Promise((resolve,reject)=>{
    navigator.geolocation.getCurrentPosition(
      pos=>{
        resolve({
          lat: pos.coords.latitude.toFixed(6),
          lon: pos.coords.longitude.toFixed(6),
          map:`https://maps.google.com/?q=${pos.coords.latitude},${pos.coords.longitude}`
        });
      },
      err=>reject(err),
      { enableHighAccuracy:true }
    );
  });
}

function disableSubmit(btn, sec=10){
  btn.disabled=true;
  let t=sec;
  const txt=btn.innerText;
  const i=setInterval(()=>{
    btn.innerText=`Please wait ${t}s`;
    t--;
    if(t<0){
      clearInterval(i);
      btn.disabled=false;
      btn.innerText=txt;
    }
  },1000);
}

/* ================= FORM ================= */

signupForm.onsubmit = async e=>{
  e.preventDefault();
  if(!admissionsOpen) return;

  const btn = signupForm.querySelector("button");
  disableSubmit(btn,10);

  let loc={lat:"N/A",lon:"N/A",map:"N/A"};
  try{ loc = await getUserCoordinates(); }catch{}

  const reg="SCA-"+Date.now().toString().slice(-6);

  const data={
    reg,
    name:playerName.value,
    age:age.value,
    parent:parentName.value,
    phone:phone.value,
    address:address.value,
    timing:timing.value,
    latitude:loc.lat,
    longitude:loc.lon,
    map:loc.map,
    date:new Date().toLocaleString("en-IN")
  };

  players.push(data);
  localStorage.setItem("players",JSON.stringify(players));

  await fetch("/api/sendTelegram",{
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body:JSON.stringify(data)
  });

  submitMsg.innerHTML="<div class='success'>Admission Successful! Telegram & GPS sent.</div>";
  signupForm.reset();
};

/* ================= ADMIN ================= */

function loadTable(){
  tableBody.innerHTML="";
  players.forEach(p=>{
    const r=tableBody.insertRow();
    ["reg","name","age","parent","phone","timing","date"].forEach(k=>{
      r.insertCell().textContent=p[k];
    });
  });
}

show("home");
