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
        document.getElementsByClassName("count-2")[0].style.display = "inline-block";
    }
    const maintag=document.getElementById("maintag");
    const button_2 = document.getElementById("button-2");
        button_2.addEventListener('click', function() {
            const namefield=document.getElementById("name-field").value;
            console.log(namefield);
            const popup = document.getElementById("popup");
            popup.classList.toggle('active'); // Toggle the active class on the popup
            maintag.style.display="none";
            document.getElementById("body").style.backgroundColor="grey";
    });
    const submitbutton=document.getElementById("button-01");
        const show=document.getElementById("textfeild");
        const mailinput=document.getElementById("mailid-01");

        submitbutton.addEventListener('click',function(){
            const inputs=mailinput.value;
            const newtext=document.createElement("div");
            newtext.textContent=inputs;
            newtext.style.color="white";
            show.appendChild(newtext);
            console.log(inputs);
            newtext.style.marginBottom="20px";
            mailinput.value="";
    });
    const closetag=document.getElementById("toggleit");
    closetag.addEventListener('click',function(){
        const popup = document.getElementById("popup");
        popup.style.display="none";
        maintag.style.display="block";
        document.getElementById("body").style.backgroundColor="white";
    });
}