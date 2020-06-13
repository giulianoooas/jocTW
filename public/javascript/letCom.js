const zonaComentarii = document.createElement("div");

zonaComentarii.style.position = "absolute";
zonaComentarii.style.left = "20px";
zonaComentarii.style.top = "150px";
zonaComentarii.style.backgroundColor= "white";
zonaComentarii.style.border = "1px solid black";
zonaComentarii.style.borderRadius = "20%";
zonaComentarii.style.textAlign = "center";
zonaComentarii.style.width = "150px";

const creazaBaraComentarii = () => {
    const p = document.createElement("p");
    p.style.color = "green";
    p.style.fontFamily = "Arial";
    p.style.fontWeight = "bold";
    p.textContent = "comentarii";
    zonaComentarii.appendChild(p);
    const hr = document.createElement("hr");
    zonaComentarii.appendChild(hr);
    screen.appendChild(zonaComentarii);
    const button2 = document.createElement("button");
    button2.style = "border-radius: 20%; border : 1px solid black; color : green;";
    button2.textContent= "Comment";
    zonaComentarii.appendChild(button2);
    button2.addEventListener("click" , () => {
        
    })
};

creazaBaraComentarii();