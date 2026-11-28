'use strict';



const npcRewards = {
    kame_point: {
        item: "Kame House Meal",
        quantity: 1,
        message: "Master Roshi gives you a meal to restore your strength."
    },

    jingeru_point: {
        item: "Village Herbs",
        quantity: 2,
        message: "A villager gives you some healing herbs."
    },

    baseru_point: {
        item: "Healing Capsule",
        quantity: 1,
        message: "A local scientist gives you a healing capsule."
    }
};

const claimedNpcRewards = new Set();

const battlePage = document.querySelector("#battle-screen");
const dialogueText = document.querySelector("#dialogue-text");
const continueBtn = document.querySelector("#continue-button");

let currentLocationId = START_LOCATION;

const mainPage = document.querySelector("#start-screen");
const locationPage = document.querySelector("#location-screen");
const mapPage = document.querySelector('#map-screen');
const playBtn = document.querySelector("#play-button");
const mapBtn = document.querySelector('#map_btn');
const backBtn = document.querySelector('.back_icon');
const menuBtn = document.querySelector('#menu_btn');
const settingsBtn = document.querySelector('#settings-button');
const noticeBox = document.querySelector('#notice');
const homeBtn = document.querySelector("#home-button");
const guideBtn = document.querySelector("#guide-button");
const guidePopup = document.querySelector("#guide-popup");
const closeGuideBtn = document.querySelector("#close-guide");
const guidePages = document.querySelectorAll(".guide-page");
const previousGuideBtn = document.querySelector("#previous-guide");
const nextGuideBtn = document.querySelector("#next-guide");
const guidePageNumber = document.querySelector("#guide-page-number");

let currentGuidePage = 0;


// location data

const location_img = document.querySelector("#location_img");
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



// function to show guide book and change # 
function showGuidePage(pageNumber) {

    for (let i = 0; i < guidePages.length; i++) {
        guidePages[i].classList.remove("active");
    }

    guidePages[pageNumber].classList.add("active");

    currentGuidePage = pageNumber;

    guidePageNumber.innerText = (currentGuidePage + 1) + " / " + guidePages.length;

    previousGuideBtn.disabled = currentGuidePage === 0;
    nextGuideBtn.disabled = currentGuidePage === guidePages.length - 1;
}

// Open the guide
guideBtn.addEventListener("click", function() {
    showGuidePage(0);
    guidePopup.showModal();
});

// Close the guide
closeGuideBtn.addEventListener("click", function() {
    guidePopup.close();
});

// Previous page
previousGuideBtn.addEventListener("click", function() {
    if (currentGuidePage > 0) {
        showGuidePage(currentGuidePage - 1);
    }
});

// Next page
nextGuideBtn.addEventListener("click", function() {
    if (currentGuidePage < guidePages.length - 1) {
        showGuidePage(currentGuidePage + 1);
    }
});
// function for change section
// the settings button only exists outside of the start screen

function changeSection(screenA, screenB) {
    mainPage.classList.add("hidden");
    locationPage.classList.add("hidden");
    mapPage.classList.add("hidden");
    battlePage.classList.add("hidden");
    screenB.classList.remove("hidden");
    settingsBtn.classList.toggle("hidden", screenB !== battlePage);
    if (screenB === mainPage) {
        closeMenu();
    }
}


function showNotice(text){
    if (noticeBox.classList.contains("hidden")) {
        noticeBox.textContent = text;
    } else {
        noticeBox.textContent += " " + text;
    }
    noticeBox.classList.remove("hidden");
}

function hideNotice(){
    noticeBox.classList.add("hidden");
}

// can't walk away in the middle of a fight
function blockedByBattle(){
    if (battleActive) {
        showMessage("Finish the fight or run away first!");
        return true;
    }
    return false;
}

function claimLocationReward(locationId) {
    const reward = npcRewards[locationId];
    if (!reward || claimedNpcRewards.has(locationId)) {
        return;
    }
    claimedNpcRewards.add(locationId);
    addItem(reward.item, reward.quantity);
    showNotice(reward.message);
}



// change to location screen when click play button from start screen
// playBtn.addEventListener("click", function(evt){
//     evt.preventDefault();
//     changeSection(mainPage, locationPage);
// });
playBtn.addEventListener("click", function () {
    hideNotice();
    setLocation(START_LOCATION);
    changeSection(mainPage, locationPage);
});

const titleMapBtn = document.querySelector("#map-button");
titleMapBtn.addEventListener("click", function () {
    changeSection(mainPage, mapPage);
    removeDB()
});

// change to map screen when click map button from location screen
mapBtn.addEventListener("click", function(evt){
    evt.preventDefault();
    if (blockedByBattle()) return;
    removeDB()
    changeSection(locationPage, mapPage);
});

// change to start screen when click menu button from location screen
menuBtn.addEventListener("click", function(evt){
    evt.preventDefault();
    if (blockedByBattle()) return;
    changeSection(locationPage, mainPage);
    removeDB()
});

// back to location screen when click back button from map screen
backBtn.addEventListener("click", function(evt){
    evt.preventDefault();
    // re-create db when back btn is clicked
    putDB(locations[currentLocationId])
    changeSection(mapPage, locationPage);
});



let dialoguetext = locations[START_LOCATION].dialogue;

const points = document.querySelectorAll("#map-screen .location_icon");

// show a location: image, dialogue text and the goku icon on the map
// function setLocation(id){
//     const loc = locations[id];
//     location_img.src = loc.img;
//     location_img.alt = loc.alt;
//     dialoguetext = loc.dialogue;

//     // remove dialogue when change location
//     const oldDialogue = document.querySelector(".dialogue");
//     if (oldDialogue) oldDialogue.remove();

//     // change icon of location point
//     points.forEach(function(point){
//         point.src = "images/mappoint.png";
//         point.style.width = "2%";
//     });
//     const current = document.getElementById(id);
//     current.src = "images/goku.png";
//     current.style.width = "3%";
// }

function setLocation(id) {
    const loc = locations[id];
    if (!loc) return;
    currentLocationId = id;
    location_img.src = loc.img;
    location_img.alt = loc.alt;
    dialogueText.textContent = loc.dialogue;
    putDB(loc);
    document.querySelector("#dialogue-box").classList.remove("hidden");
    points.forEach(function (point) {
        point.src = "images/mappoint.png";
        point.style.width = "2%";
    });
    const current = document.getElementById(id);
    if (current) {
        current.src = "images/goku.png";
        current.style.width = "3%";
    }
    claimLocationReward(id);
}

// toggle dialogue when click on screen
// const topScreen = document.querySelector(".top");
// topScreen.addEventListener("click", function(evt){
//     evt.preventDefault();
//     const existing = document.querySelector(".dialogue");
//     if (existing) {
//         existing.remove();
//         return;
//     }
//     const p = document.createElement("p");
//     p.classList.add("dialogue");
//     p.innerText = dialoguetext;
//     document.querySelector(".location-img").appendChild(p);
// });

// move to location when click the point on the map - the encounter starts here
points.forEach(function(point){
    point.addEventListener("click", function(evt) {
        evt.preventDefault();
        if (blockedByBattle()) return;
        hideNotice();
        setLocation(point.id);
        // if(collectDragonBall(point.id)) {alert("You found a Dragon Ball! " + dragonBallsFound + "/7");}
        changeSection(mapPage, locationPage);
        // if (dragonBallsFound.length === 7) {document.querySelector("#win-popup").showModal();}
    });
});

// continueBtn.addEventListener("click", function() {
//     // If this location has an enemy that hasn't been defeated, begin the encounter.
//     if (enemies[currentLocationId] &&
//         !defeatedEnemies.has(currentLocationId)) {
//         startEncounter(currentLocationId);
//     } else {
//         // no enemy here?, see ya
//         changeSection(locationPage, mapPage);
//     }
// });

continueBtn.addEventListener("click", function() {
    if (enemies[currentLocationId] &&
        !defeatedEnemies.has(currentLocationId)) {
        startEncounter(currentLocationId);
    } else {
        changeSection(locationPage, mapPage);
    }
    removeDB()
});

// return 
const battleMapBtn = document.querySelector("#battle-map-button");
battleMapBtn.addEventListener("click", function() {
    if (battleActive) {
        showMessage("Finish the encounter or run away first!");
        return;
    }
    endEncounter();
    changeSection(battlePage, mapPage);
});

// death/game over

// called from battle.js when health reaches 0 ( you speel forever )
function playerDefeated() {
    const livesLeft = loseLife();
    if (!livesLeft) {
        gameOver();
        return;
    }
    restoreFullHealth();
    endEncounter();
    setLocation(START_LOCATION);
    changeSection(battlePage, locationPage);
    showNotice("You were defeated! You wake up at Kame House with full health. Lives left: " +player.lives);
}

// out of lives? out of tries, start again
function gameOver() {
    resetPlayer();
    resetBattleProgress();
    placeDragonBalls(); 
    setLocation(START_LOCATION);
    claimedNpcRewards.clear();
    hideNotice();
    changeSection(battlePage, mainPage);
    alert("Game Over! You ran out of lives. Starting a new game.");
}




///////

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

