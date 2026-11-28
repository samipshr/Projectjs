'use strict';



const mainPage = document.querySelector("#start-screen");
const locationPage = document.querySelector("#location-screen");
const mapPage = document.querySelector('#map-screen');
const playBtn = document.querySelector("#play-button");
const mapBtn = document.querySelector('#map_btn');
const backBtn = document.querySelector('.back_icon');
const menuBtn = document.querySelector('#menu_btn');
const location_img = document.querySelector("#location_img");


// set locations
const locations = {
    kame_point: {
        img: "images/kame_house.jpg", 
        alt: "Kamehouse",
        dialogue: "Ah, you're finally here! Dark energy is stirring across the globe, and the Dragon Balls have scattered once again. Check the Dragon Radar and start your search before the wrong hands claim them!",
        dragonball: "",
        dbid:"kame_db"
    },
    satan_point: {
        img: "images/satan_city.jpg",
        alt: "Satan City",
        dialogue: "Breaking news! Mysterious armored troops were spotted flying over the stadium at dawn. Even the World Champion hasn't returned from his training—be careful out there, traveler!",
        dragonball: "",
        dbid:"satan_db"
    },
    east_point: {
        img: "images/east_capital.jpg",
        alt: "East Capital",
        dialogue: "The main power grid in East Capital went haywire right after a strange meteor-like signal flashed toward the eastern coast. My sensors picked up a faint Dragon Ball frequency near the harbor!",
        dragonball: "",
        dbid:"east_db"
    },
    papaya_point: {
        img: "images/papaya_island.jpg",
        alt: "Papaya Island",
        dialogue: "The World Martial Arts Arena is quiet today, warrior. Yesterday, a hooded fighter asked about an ancient glowing orb hidden beneath the arena tiles before vanishing toward the sea!",
        dragonball: "",
        dbid:"papaya_db"
    },
    jingeru_point: {
        img: "images/jingeru_village.jpg",
        alt: "Jingeru Village",
        dialogue: "Our peaceful village hasn't felt this uneasy in years. Strange drones have been scanning the cliffs since midnight. If you are searching for the sacred sphere, look closely near the old stone shrine.",
        dragonball: "",
        dbid:"jingeru_db"
    },
    north_point: {
        img: "images/north_capital.jpg",
        alt: "North Capital",
        dialogue: "Brrr... welcome to North Capital! The blizzard here hides more than ice. A scout reported Red Ribbon supply sleds heading straight toward Muscle Tower with a locked metal case.",
        dragonball: "",
        dbid:"north_db"
    },
    central_point: {
        img: "images/central_capital.jpg",
        alt: "Central Capital",
        dialogue: "By order of the King, all citizens are advised to stay alert! Rumors say someone is trying to gather all seven Dragon Balls to rewrite the world's fate. Have you gathered any clues yet?",
        dragonball: "",
        dbid:"central_db"
    },
    pilaf_point: {
        img: "images/pilaf_castle.jpg",
        alt: "Pilaf's Castle",
        dialogue: "Mwahaha! You dare trespass in MY fortress?! Wait—why are you looking at me like that?! Fine, I admit it! Someone stole my radar blueprints, and I want payback just as much as you do!",
        dragonball: "",
        dbid:"pilaf_db"
    },
    yunzabit_point: {
        img: "images/yunzabit_height.jpg",
        alt: "Yunzabit Heights",
        dialogue: "Few ever climb the freezing winds of Yunzabit Heights. Long ago, an ancient ship crashed into these peaks... and beneath the snow, a strange energy still pulses in rhythm with the stars.",
        dragonball: "",
        dbid:"yunzabit_db"
    },
    ginger_point: {
        img: "images/ginger_town.jpg",
        alt: "Ginger Town",
        dialogue: "Ginger Town used to be bustling with travelers, until strange shadows started lurking in the alleys after sunset. Whatever you're hunting, don't let your guard down for a second!",
        dragonball: "",
        dbid:"ginger_db"
    },
    baseru_point: {
        img: "images/baseru_city.jpg",
        alt: "Baseru City",
        dialogue: "Looking for supplies or secrets? A traveler traded me this ancient map scrap in exchange for food. He muttered something about a giant tower piercing the clouds to the west!",
        dragonball: "",
        dbid:"baseru_db"
    },
    muscle_point: {
        img: "images/muscle_tower.jpg",
        alt: "Muscle Tower",
        dialogue: "Please... I don't want to fight anyone. The soldiers upstairs locked a glowing orange ball inside the top vault. If you're strong enough to reach it, promise you'll use it for good!",
        dragonball: "",
        dbid:"muscle_db"
    },
    karin_point: {
        img: "images/karin_land.jpg",
        alt: "Karin Land",
        dialogue: "Hoho! Climbing all the way up Karin Tower takes true spirit. Take a moment to catch your breath—the Dragon Ball you seek lies not far from here, though a fierce guardian awaits your arrival.",
        dragonball: "",
        dbid:"karin_db"
    },
    redribbon_point: {
        img: "images/red_ribbon_HQ.jpg",
        alt: "Red Ribbon HQ",
        dialogue: "Intruder alert! How did you breach our perimeter?! Even if you defeat our troops, the final Dragon Ball coordinates have already been transmitted to the jungle outpost!",
        dragonball: "",
        dbid:"redribbon_db"
    },
    jungle_point: {
        img: "images/primal_jungle.jpg",
        alt: "Primal Jungle",
        dialogue: "Shh! Keep your voice down—dinosaurs aren't the only danger in this jungle anymore. Deep within the overgrown ruins lies the last resting place of the Dragon Ball. Are you ready for the final trial?",
        dragonball: "",
        dbid:"jungle_db"
    }
};

// set current location
let currentLocation = locations.kame_point;

// set inventory
let inventory = [];








// change to location screen when click play button from start screen
playBtn.addEventListener("click", function(evt){
    evt.preventDefault();
    changeSection(mainPage,locationPage);
});

// change to map screen when click map button from location screen
mapBtn.addEventListener("click", function(evt){
    evt.preventDefault();
    changeSection(locationPage,mapPage);
    // remove dragonball when leaving the location
    removeDB();
});

// change to start screen when click menu button from location screen
menuBtn.addEventListener("click", function(evt){
    evt.preventDefault();
    changeSection(locationPage,mainPage);
});

// back to location screen when click back button from map screen
backBtn.addEventListener("click", function(evt){
    evt.preventDefault();
    changeSection(mapPage,locationPage);
    // re-create db when back btn is clicked
    putDB(currentLocation)
});

// function for change section
function changeSection(screenA, screenB){   
    screenA.classList.add("hidden");
    screenB.classList.remove("hidden");
}


// set dialogue for kamehouse
let dialoguetext = "Ah, you're finally here! Dark energy is stirring across the globe, and the Dragon Balls have scattered once again. Check the Dragon Radar and start your search before the wrong hands claim them!";

// random locations have dragonballs
randomlocation();

// set dragonball for kamehouse 
putDB(locations.kame_point)

// toggle dialogue when click on screen
const screen = document.querySelector(".top")
screen.addEventListener("click", dialogue)

// move to location when click the point on the map
const points = document.querySelectorAll("#map-screen .location_icon");
for(let i=0; i< points.length; i++){
    points[i].addEventListener("click", function(evt){
        evt.preventDefault();
        const location = locations[points[i].id];
        location_img.src = location.img;
        location_img.alt = location.alt;
        dialoguetext = location.dialogue;
        // set current location
        currentLocation = location;
        // set dragonball for location
        putDB(location);
        // remove dialogue when change location
        const oldDialogue = document.querySelector(".dialogue");
        if (oldDialogue){
            dialogueOff(evt);
        }
        // change icon of location point
        for(let i=0; i< points.length; i++){
            points[i].src = "images/mappoint.png";
            points[i].style.width = "2%";
        }
        points[i].src = "images/goku.png";
        points[i].style.width = "3%";

        changeSection(mapPage,locationPage);
    })
}

// add dialogue
function dialogue(evt){
    evt.preventDefault();
    const figure = document.querySelector(".location-img");
    const p = document.createElement("p");
    p.classList.add("dialogue")
    p.innerText = dialoguetext;
    figure.appendChild(p)
    screen.removeEventListener("click", dialogue);
    screen.addEventListener("click", dialogueOff);
}

function dialogueOff(evt){
    evt.preventDefault();
    const p = document.querySelector(".dialogue");
    p.remove();
    screen.removeEventListener("click", dialogueOff);
    screen.addEventListener("click", dialogue);
}

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
        const figure = document.querySelector(".location-img");
        const dbimg = document.createElement('img');
        dbimg.src = `images/${location.dragonball}.png`;
        dbimg.alt = "dragonball";
        dbimg.classList.add("dragonball");
        dbimg.setAttribute('id', location.dbid)
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
    if (currentLocation.dragonball !== ""){
        inventory.add(currentLocation.dragonball)
        currentLocation.dragonball = ""
        removeDB()
    }
}