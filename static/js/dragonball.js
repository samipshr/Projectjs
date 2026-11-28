'use strict';

let dragonBallSpots = [];
let dragonBallsFound = 0;

// put the 7 balls in their places (change this list to move them)
function placeDragonBalls() {
    dragonBallSpots = [
        "east_point",      
        "papaya_point",    
        "jingeru_point",   
        "yunzabit_point",  
        "muscle_point",    
        "karin_point",     
        "jungle_point"     
    ];
    dragonBallsFound = 0;
    showDragonBalls();
}


// pick up the ball at this place, returns true if there was one
function collectDragonBall(spot) {
    for (let i = 0; i < dragonBallSpots.length; i++) {
        if (dragonBallSpots[i] === spot) {
            dragonBallSpots[i] = "";   // ball is gone from this place
            dragonBallsFound++;
            showDragonBalls();
            return true;
        }
    }
    return false;
}


// show the count and fade the balls you don't have yet
function showDragonBalls() {
    document.getElementById("dragonball-count").textContent = dragonBallsFound;

    const images = document.querySelectorAll("#dragonball-icons img");
    for (let i = 0; i < images.length; i++) {
        if (i < dragonBallsFound) {
            images[i].style.opacity = 1;     // found
        } else {
            images[i].style.opacity = 0.25;  // not found yet
        }
    }
}


placeDragonBalls();