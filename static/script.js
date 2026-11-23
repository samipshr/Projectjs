'use strict';






// toggle dialogue when ckick on screen
const screen = document.querySelector(".top")
screen.addEventListener("click", dialogue)

function dialogue(evt){
    evt.preventDefault();
    const top = document.querySelector(".top");
    const p = document.createElement("p");
    p.classList.add("dialogue")
    p.innerText = "something asdiosadndadsjasdkasjdkjaskdja daksj dk jsakd as djas jda something asdiosadndadsjasdkasjdkjaskdja daksj dk jsakd as djas jda something asdiosadndadsjasdkasjdkjaskdja daksj dk jsakd as djas jdasomething asdiosadndadsjasdkasjdkjaskdja daksj dk jsakd as djas jdasomething asdiosadndadsjasdkasjdkjaskdja daksj dk jsakd as djas jda";
    top.appendChild(p)
    screen.removeEventListener("click", dialogue);
    screen.addEventListener("click", dialogueoff);
}
function dialogueoff(evt){
    evt.preventDefault();
    const p = document.querySelector(".dialogue");
    p.remove();
    screen.removeEventListener("click", dialogueoff);
    screen.addEventListener("click", dialogue);
}