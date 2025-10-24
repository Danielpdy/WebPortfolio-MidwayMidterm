
const headerLinks = document.querySelectorAll(".headerLink");
const mainContainer = document.getElementById("mainContainer");
const modeSelect = document.getElementById("modeSelect");
const inputField = document.getElementById("inputField");
const googleIcon = document.getElementById("googleIcon");

modeSelect.addEventListener("change", function() {
    if (modeSelect.value === "dark") {
        mainContainer.classList.remove("mainContainer");
        mainContainer.classList.add("darkMode");

        headerLinks.forEach(link => {
            link.style.color = "white";
        });
        
        modeSelect.style.backgroundColor = "rgb(32, 32, 32)";
        modeSelect.style.color = "white";
        inputField.style.backgroundColor = "rgb(32, 32, 32)";
        inputField.style.color = "white";

        googleIcon.setAttribute("src", "/Google/images/googleWhiteIcon.png");
    } else {
        mainContainer.classList.remove("darkMode");
        mainContainer.classList.add("mainContainer");

        headerLinks.forEach(link => {
            link.style.color = "black";
        });
        modeSelect.style.backgroundColor = "white";
        modeSelect.style.color = "black";
        inputField.style.backgroundColor = "white";
        inputField.style.color = "black";

        googleIcon.setAttribute("src", "/Google/images/googleIcon.png");
       
    }
});