function checkit() {
    let textfeild = document.getElementById("input-10");
    let datefeild_1 = document.getElementById("input-11");
    let datefeild_2 = document.getElementById("input-12");
    console.log(textfeild.value);
    console.log(datefeild_1.value);
    console.log(datefeild_2.value);

    if (textfeild.value === "") {
        textfeild.placeholder = "Destination is required";
    }
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
            newtext.style.marginBottom="20px";
            newtext.style.fontSize="15px";
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