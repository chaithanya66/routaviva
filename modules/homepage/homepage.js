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
function checkit() {
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
}

document.getElementById("showpopup").addEventListener('click',function(){
    document.getElementById("popup").style.display="block";
    document.getElementById("maintag").style.display="none";
});

const submitbutton=document.getElementById("button-01");
        const show=document.getElementById("textfeild");
        const mailinput=document.getElementById("mailid-01");
        let count=0;
        submitbutton.addEventListener('click',function(){
            const inputs=mailinput.value;
            const newtext=document.createElement("div");
            newtext.textContent=inputs;  
            newtext.style.color="white";
            show.appendChild(newtext);
            console.log(inputs);
            newtext.style.marginBottom="10px";
            newtext.style.fontSize="15px";
            newtext.style.backgroundColor="#09090B"
            newtext.style.height="20px";
            newtext.style.padding="5px";
            newtext.style.display="inline-block";
            newtext.style.textAlign="center";
            mailinput.value="";
            count++;
            document.getElementById("showpopup").innerHTML=`You are traveling with ${count} co-passengers`;
    });
    
    const closetag=document.getElementById("toggleit");
    closetag.addEventListener('click',function(){
        const popup = document.getElementById("popup");
        popup.style.display="none";
        maintag.style.display="block";
        document.getElementById("body").style.backgroundColor="white";
    });