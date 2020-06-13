const body = document.querySelector("body");
body.style.transition = "2s";

const schimba = () => {
    const poz = window.getComputedStyle(body,null).getPropertyValue("background-position");
    if (!darkmode){
        if (poz == "100% 50%")
        {
            body.style.backgroundPosition = "left";
        } else {
            body.style.backgroundPosition = "right";
        }
    } else {
        body.style.backgroundImage = "initial";
    }   
};

schimba();

const startAnimatie = setInterval(schimba, 3000);