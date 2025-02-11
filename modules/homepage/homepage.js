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
        document.getElementById("toggleit").addEventListener('click',function(){
            const popup=document.getElementById("popup");
            popup.classList.remove('active');
            maintag.style.display="block";
            document.getElementById("body").style.backgroundColor="white";
        });
    
}
const buttontag=document.getElementById("addanotheremail");
        buttontag.addEventListener('click',function(){
            const numberof=document.getElementById("noofmail").value;
            const storeemail=[];
            for(i=0;i<numberof;i++){
                const input=document.createElement('input');
                input.type='email';
                input.name='emailEle';
                input.placeholder='Enter email';
                input.style.backgroundColor='#085f57';
                input.style.border='none';
                input.style.outline='none';
                input.style.marginTop='20px';
                document.getElementById("inputs").appendChild(input);
                storeemail.push(input);
                
            }
            document.getElementById("textchange-").textContent="Enter the mail id's";
            document.getElementById("emailsendingbutt").style.display='block';
            document.getElementById("addanotheremail").style.display='none';

            document.getElementById("emailsendingbutt").addEventListener('click',function(){
                storeemail.forEach(storeEmails=>{
                    console.log(storeEmails.value);
                });
                const popup=document.getElementById("popup");
                popup.classList.remove('active');
                maintag.style.display="block";
                document.getElementById("body").style.backgroundColor="white";
            });
        });
