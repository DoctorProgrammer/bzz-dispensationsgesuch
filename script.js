const input = document.getElementById("lehrpersonen");
const list = document.getElementById("dropdown");
const searchlp = document.querySelector("#searchlp > div");

// list is an ol element and i want only the li elements displayed, which have letters in common with the input value

input.addEventListener("focus", function () {
    list.style.opacity = "1";
    list.style.zIndex = "1";
});

input.addEventListener("blur", function () {
    list.style.opacity = "0";
    // timeout for 0.1 seconds, so that the user can click on the li element before it disappears
    setTimeout(function () {
        list.style.zIndex = "-1";
    }, 1000);
});

input.addEventListener("keyup", function () {
    const value = input.value;
    const listItems = list.querySelectorAll("li");

    listItems.forEach(function (item) {
        if (item.innerText.toLowerCase().includes(value.toLowerCase())) {
            item.classList.remove("hide");
        } else {
            item.classList.add("hide");
        }
    });
});

// if an li element of the list is clicked, the value of the input field should be replaced with the innerText of the clicked li element

list.addEventListener("click", function (event) {
    const listItems = list.querySelectorAll("li");
    const allLpElements = document.querySelectorAll(".lp");

    let bool = true;

    // if one of allLpElements has the same innerText as the clicked li element, the li element should not be added to the searchlp div
    allLpElements.forEach(function (lpElement) {
        if (lpElement.innerText === event.target.innerText) {
            bool = false;
        }
    });

    if (event.target.tagName === "LI" && bool) {
        value = event.target.innerText;
        input.value = "";

        lpElement = document.createElement("p1");
        lpElement.innerText = value;
        lpElement.classList.add("lp");

        lpElement.addEventListener("click", function () {
            this.remove();
        });

        searchlp.appendChild(lpElement);
    }

    listItems.forEach(function (item) {
        item.classList.remove("hide");
    });
});

const dateVon = document.getElementById("von");
const dateBis = document.getElementById("bis");

// dateVon und dateBis sind inputs vom type date. Der min-Wert von beiden soll der heutige Tag sein.
const today = new Date().toISOString().split("T")[0];
dateVon.setAttribute("min", today);
dateBis.setAttribute("min", today);

// dateVon darf nicht größer sein als dateBis und umgekehrt
dateVon.addEventListener("change", function () {
    dateBis.setAttribute("min", dateVon.value);
});