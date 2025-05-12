import {homepage_url} from "../../constants/constants.js";

let user_id_export=localStorage.getItem("user_id");
console.log(user_id_export);

// Api to fetch where trips are created are not
async function fetchdetails(user_id_export) {
    try {
        const response=await fetch(homepage_url,{
            headers: {
                'uid':user_id_export
            }
        });
        if(!response.ok){
            throw new Error(`fetching error: ${response.status}`);
        }
        const res=await response.json();
        console.log(res);
        if(res.data && Array.isArray(res.data.trips) && res.data.trips.length !== 0){
            window.location.href="../../animation.html";
        }
    } 
    catch (error) {
        console.error("error while fetching");
    }
}
fetchdetails(user_id_export);


document.getElementById("button-start").addEventListener('click',function(){
    let textfeild_end = document.getElementById("input-10");
    let textfeild_start = document.getElementById("input-101");
    
    if (textfeild_start.value === "") {
        textfeild_start.placeholder = "starting point is required";
    }
    if (textfeild_end.value === "") {
        textfeild_end.placeholder = "Destination is required";
    }
    if (textfeild_start.value !== "" && textfeild_end.value !== "") {
        document.getElementsByClassName("cont")[0].style.display = "inline-block";
        document.getElementById("button-start").style.display = "none";
    }
    console.log(textfeild_start.value);
    console.log(textfeild_end.value);
});
document.getElementById("button").addEventListener('click',function(){
    let datefeild_1 = document.getElementById("input-11");
    let datefeild_2 = document.getElementById("input-12");
    console.log(datefeild_1.value);
    console.log(datefeild_2.value);

    if (datefeild_1.value === "") {
        console.log("Enter the Start date to proceed");
    }
    if (datefeild_2.value === "") {
        console.log("Enter the end date to proceed");
    }
    if (textfeild.value !== "" && datefeild_1.value !== "" && datefeild_2.value !== "") {
        document.getElementById("button").style.display = "none";
        document.getElementsByClassName("cont-2")[0].style.display = "inline-block";
    }
});

const enroutedis = document.getElementById("button_02");
const enrouteElement = document.getElementsByClassName("enroute")[0];
enroutedis.addEventListener('click', function() {
    document.getElementById("button_02").style.display="none";
    enrouteElement.style.display = "inline-block";
});

//collabrators popup
document.getElementById("showpopup").addEventListener('click',function(){
    document.getElementById("popup").style.display="block";
    document.getElementById("maintag").style.display="none";
    document.getElementById("body").style.backgroundColor="grey";
});
let collaboratorsList = [];

const submitbutton=document.getElementById("button-01");
        const show=document.getElementById("textfeild");
        const mailinput=document.getElementById("mailid-01");
        let count=0;

        submitbutton.addEventListener('click', function () {
            const collaborator = mailinput.value;
            if (collaborator.trim() !== "") {
                collaboratorsList.push(collaborator); // Store it globally
                const newtext = document.createElement("div");
                newtext.textContent = collaborator;
                newtext.style.color = "white";
                newtext.style.marginBottom = "10px";
                newtext.style.fontSize = "15px";
                newtext.style.borderRadius = "10px";
                newtext.style.backgroundColor = "hsla(0, 0%, 0%, 0.6)";
                newtext.style.height = "20px";
                newtext.style.marginRight = "10px";
                newtext.style.padding = "15px";
                newtext.style.display = "inline-block";
                newtext.style.textAlign = "center";
                show.appendChild(newtext);

                mailinput.value = "";
                count++;
                document.getElementById("showpopup").innerHTML = `You are traveling with ${count} co-passengers`;
            }
        });
  
    const closetag=document.getElementById("toggleit");
    closetag.addEventListener('click',function(){
        const popup = document.getElementById("popup");
        popup.style.display="none";
        maintag.style.display="block";
        document.getElementById("body").style.backgroundColor="white";
});

// enroute popup
document.getElementById("enroutepop").addEventListener('click',function(){
    document.getElementById("popup-2").style.display="block";
    document.getElementById("maintag").style.display="none";
    document.getElementById("body").style.backgroundColor="grey";
});
let enroutelist = [];

const submitbutton1=document.getElementById("button-011");
        const show1=document.getElementById("textfeild1");
        const textinput=document.getElementById("text-1");
        let countit=0;

        submitbutton1.addEventListener('click', function () {
            const enroutestop = textinput.value;
            if (enroutestop.trim() !== "") {
                enroutelist.push(enroutestop); // Store it globally
                const newtext = document.createElement("div");
                newtext.textContent = enroutestop;
                newtext.style.color = "white";
                newtext.style.marginBottom = "10px";
                newtext.style.fontSize = "15px";
                newtext.style.borderRadius = "10px";
                newtext.style.backgroundColor = "hsla(0, 0%, 0%, 0.6)";
                newtext.style.height = "20px";
                newtext.style.marginRight = "10px";
                newtext.style.padding = "15px";
                newtext.style.display = "inline-block";
                newtext.style.textAlign = "center";
                show1.appendChild(newtext);
        
                textinput.value = "";
                countit++;
                document.getElementById("enroutepop").innerHTML = `You are interested in ${countit} enroute stops`;
            }
        });
  
    const closetag1=document.getElementById("toggleit1");
    closetag1.addEventListener('click',function(){
        const popupit = document.getElementById("popup-2");
        popupit.style.display="none";
        maintag.style.display="block";
        document.getElementById("body").style.backgroundColor="white";
});

const postadetails=document.getElementById("enroute-butt");
postadetails.addEventListener('click',function(){
    try {
        const response= fetch('https://rutavivaunsecured-1.onrender.com/trip', {
            method: 'POST',
            headers: {
              'uid': user_id_export, 
              'Content-Type': 'application/json',
              'X-API-Key': ''  
            },
            body: JSON.stringify({
              tripName: document.getElementById("input-10").value,
              fromDestination: document.getElementById("input-101").value,
              toDestination: document.getElementById("input-10").value,
              fromDate: document.getElementById("input-11").value,
              toDate: document.getElementById("input-12").value,
              enRouteStops: enroutelist,
              collaborators: collaboratorsList
            })
          });
          console.log(response);
          if(response.status===200){
            window.location.href="../../index.html";
          }

    } catch (error) {
        console.error(error);
    }
});
    