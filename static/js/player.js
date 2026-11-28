'use strict';

const START_LOCATION = "kame_point";
const MAX_LIVES = 3;
const START_HEALTH = 10;
const XP_PER_LEVEL = 10;      // exp needed per level
const HEALTH_PER_LEVEL = 2;   // max health gained on level up

const player = {
    name: "Hero",
    health: START_HEALTH,
    maxHealth: START_HEALTH,
    lives: MAX_LIVES,
    level: 1,
    xp: 0,
    attack: 10,
    defense: 5
};

// inventory - dunno what to do with this, you decide
const itemData = {
    "Kame House Meal": { heal: 2 },
    "good soup":       { heal: 3 },
    "senzu bean":      { heal: 4 },  
    "Village Herbs":   { heal: 2 },
    "Healing Capsule": { heal: 4 },
    "Dumplings":       { heal: 3 }
};

const inventory = [];

function resetInventory() {
    inventory.length = 0;
    renderInventory();
}

function addItem(name, quantity = 1) {
    const itemInfo = itemData[name];
    if (!itemInfo) {
        console.log("Unknown item:", name);
        return;
    }
    const existing = inventory.find(item => item.name === name);
    if (existing) {
        existing.quantity += quantity;
    } else {
        inventory.push({ name: name, quantity: quantity, heal: itemInfo.heal });
    }
    renderInventory();
}

function removeItem(name) {
    const existing = inventory.find(item => item.name === name);
    if (!existing) return;
    existing.quantity--;
    if (existing.quantity <= 0) {
        inventory.splice(inventory.indexOf(existing), 1);
    }
    renderInventory();
}

function renderInventory() {
    const list = document.getElementById("item-list");
    if (!list) return;
    list.innerHTML = "";
    if (inventory.length === 0) {
        const li = document.createElement("li");
        li.textContent = "Empty";
        list.appendChild(li);
        return;
    }
    inventory.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item.name + " x" + item.quantity;
        list.appendChild(li);
    });
}

// display 
function renderLives() {
    const box = document.getElementById("lives-icons");
    if (box) {
        box.innerHTML = "";
        for (let i = 0; i < player.lives; i++) {
            const img = document.createElement("img");
            img.src = "images/heart.png";
            img.alt = "Life";
            box.appendChild(img);
        }
    }
    setText("battle-lives", player.lives);
}

function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
}

function updatePlayerDisplay() {
    setText("lvl", player.level);
    setText("health", player.health + "/" + player.maxHealth);
    setText("xp", player.xp);

    // battle screen stats
    setText("battle-level", player.level);
    setText("battle-health", player.health + "/" + player.maxHealth);
    setText("battle-xp", player.xp);
    setText("battle-lives", player.lives);
    renderLives();
}

// stats 
function takeDamage(amount) {
    player.health -= amount;
    if (player.health < 0) {
        player.health = 0;
    }
    updatePlayerDisplay();
}

function healPlayer(amount) {
    player.health += amount;
    if (player.health > player.maxHealth) {
        player.health = player.maxHealth;
    }
    updatePlayerDisplay();
}

function restoreFullHealth() {
    player.health = player.maxHealth;
    updatePlayerDisplay();
}

// returns how many levels were gained
function gainXP(amount) {
    player.xp += amount;
    let levelsGained = 0;
    while (player.xp >= XP_PER_LEVEL) {
        player.xp -= XP_PER_LEVEL;
        player.level++;
        player.maxHealth += HEALTH_PER_LEVEL;
        levelsGained++;
    }
    // restore full health whenever the player levels up
    if (levelsGained > 0) {
        player.health = player.maxHealth;
    }
    updatePlayerDisplay();
    return levelsGained;
}

// loses one life, returns true if the player still has lives left
function loseLife() {
    player.lives--;
    if (player.lives < 0) player.lives = 0;
    updatePlayerDisplay();
    return player.lives > 0;
}

// full new game
function resetPlayer() {
    player.health = START_HEALTH;
    player.maxHealth = START_HEALTH;
    player.lives = MAX_LIVES;
    player.level = 1;
    player.xp = 0;
    resetInventory();
    updatePlayerDisplay();
}

//  settings menu 
function openMenu() {
    document.getElementById("game-menu").style.display = "flex";
    showMenuPage("menu-buttons");
}

function closeMenu() {
    document.getElementById("game-menu").style.display = "none";
}

function showMenuPage(pageId) {
    const menuButtons = document.getElementById("menu-buttons");
    const pages = document.querySelectorAll(".menu-page");

    menuButtons.style.display = "none";
    pages.forEach(page => {
        page.style.display = "none";
    });
    if (pageId === "menu-buttons") {
        menuButtons.style.display = "block";
    } else {
        if (pageId === "inventory-page") renderInventory();
        document.getElementById(pageId).style.display = "block";
    }
}

resetInventory();
updatePlayerDisplay();