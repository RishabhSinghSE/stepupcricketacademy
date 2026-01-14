window.emailjsPublicKey='8A1srPbKddX75ORGR';
window.emailjsServiceId='service_4t27r3p';
window.emailjsTemplateId='template_p0fpv7p';
emailjs.init({publicKey:window.emailjsPublicKey});

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

signupForm.onsubmit=async e=>{
e.preventDefault();
if(!admissionsOpen)return;

const reg="SCA-"+Date.now().toString().slice(-6);

const data={
reg,
name:name.value,
age:age.value,
parent:parentName.value,
phone:phone.value,
address:address.value,
timing:timing.value,
time:new Date().toLocaleString("en-IN"),
date:new Date().toLocaleString("en-IN")
};

players.push(data);
localStorage.setItem("players",JSON.stringify(players));

try{
await emailjs.send(window.emailjsServiceId,window.emailjsTemplateId,data);
}catch(e){}

const proof=`STEPUP CRICKET ACADEMY
-------------------------
Registration No: ${reg}

Name: ${data.name}
Age: ${data.age}
Parent: ${data.parent}
Phone: ${data.phone}
Timing: ${data.timing}
Date: ${data.date}

This receipt is valid as admission proof.
`;

const blob=new Blob([proof],{type:"text/plain"});
const a=document.createElement("a");
a.href=URL.createObjectURL(blob);
a.download=`StepUp_${reg}.txt`;
a.click();

submitMsg.innerHTML="<div class='success'>Admission Successful! Email sent & proof downloaded.</div>";
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
