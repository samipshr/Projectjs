'use strict';

// let dragonBallSpots = [];
// let dragonBallsFound = [];

// // put the 7 balls in their places (change this list to move them)
// function placeDragonBalls() {
//     dragonBallSpots = [
//         "east_point",      
//         "papaya_point",    
//         "jingeru_point",   
//         "yunzabit_point",  
//         "muscle_point",    
//         "karin_point",     
//         "jungle_point"     
//     ];
//     dragonBallsFound = 0;
//     showDragonBalls();
// }


// // pick up the ball at this place, returns true if there was one
// function collectDragonBall(spot) {
//     for (let i = 0; i < dragonBallSpots.length; i++) {
//         if (dragonBallSpots[i] === spot) {
//             dragonBallSpots[i] = "";   // ball is gone from this place
//             dragonBallsFound++;
//             showDragonBalls();
//             return true;
//         }
//     }
//     return false;
// }


// // show the count and fade the balls you don't have yet
// function showDragonBalls() {
//     document.getElementById("dragonball-count").textContent = dragonBallsFound;

//     const images = document.querySelectorAll("#dragonball-icons img");
//     for (let i = 0; i < images.length; i++) {
//         if (i < dragonBallsFound) {
//             images[i].style.opacity = 1;     // found
//         } else {
//             images[i].style.opacity = 0.25;  // not found yet
//         }
//     }
// }


// placeDragonBalls();


let dragonBallsFound = [];
// random locations have dragonballs
randomlocation();

// set dragonball for kamehouse 
putDB(locations[START_LOCATION])

// random 7 dragon ball to locations
function randomlocation(){
    const randomLocation = new Set([]);
    for(let i=0; randomLocation.size < 7; i++){
        const randomNumber = Math.floor(Math.random() * 15) + 1;
        randomLocation.add(randomNumber);
    };
    const dbLocation = [...randomLocation]
    const dragonballs = {
        [dbLocation[0]]: "db1",
        [dbLocation[1]]: "db2",
        [dbLocation[2]]: "db3",
        [dbLocation[3]]: "db4",
        [dbLocation[4]]: "db5",
        [dbLocation[5]]: "db6",
        [dbLocation[6]]: "db7",
    }
    // add dragonball to locations
    // convert locations object to locations array 
    const locationsArray = Object.keys(locations)
    for(let i=1; i<= locationsArray.length;i++){
        if (i in dragonballs){
            locations[locationsArray[i-1]].dragonball = dragonballs[i];
        }
        else{
            locations[locationsArray[i-1]].dragonball = "";
        }
    }
}

// put dragonball img to locations
function putDB(location){
    if (location.dragonball !== ""){
        const oldDb = document.querySelector(".location-img .dragonball")
        if (oldDb) {
            oldDb.remove();
        }
        const figure = document.querySelector(".location-img");
        const dbimg = document.createElement('img');
        dbimg.src = `images/${location.dragonball}.png`;
        dbimg.alt = "dragonball";
        dbimg.classList.add("dragonball");
        dbimg.setAttribute('id', location.dbid)
        dbimg.addEventListener("click", function(evt){
            evt.preventDefault();
            collect();
        });
        figure.appendChild(dbimg);
    }
}
// remove dragonball img
function removeDB(){
    const db = document.querySelector(".dragonball")
    if (db){
        db.remove();
    }
}

// collect dragon ball when dragonball img is clicked
function collect(){
    if (locations[currentLocationId].dragonball !== ""){
        dragonBallsFound.push(locations[currentLocationId].dragonball)
        const figure = document.querySelector("#dragonball-ic")
        figure.innerHTML ="";
        for(let i = 0; i < dragonBallsFound.length; i++){
            const db = document.createElement("img");
            db.alt = dragonBallsFound[i];
            db.src = `images/${dragonBallsFound[i]}.png`
            figure.appendChild(db);  
        }
        // inventory.add(locations[currentLocationId].dragonball)
        locations[currentLocationId].dragonball = ""
        removeDB()
        if (dragonBallsFound.length === 7) {document.querySelector("#win-popup").showModal();}
    }
}