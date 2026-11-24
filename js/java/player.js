'use strict';

const player = {
    name: "Hero",
    health: 10,
    maxHealth: 10,
    level: 1,
    xp: 0,
    attack: 10,
    defense: 5
};

function updatePlayerDisplay() {
    document.getElementById("name").textContent = player.name;
    document.getElementById("lvl").textContent = player.level;
    document.getElementById("health").textContent =
        player.health + "/" + player.maxHealth;
    document.getElementById("xp").textContent = player.xp;
}

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

function gainXP(amount) {
    player.xp += amount;
    if (player.xp >= 10) {
        player.level++;
        player.xp -= 10;
    }
    updatePlayerDisplay();
}

// open settings menu
function openMenu() {
    document.getElementById("game-menu").style.display = "flex";
    showMenuPage("menu-buttons");
}

// close settings menu
function closeMenu() {
    document.getElementById("game-menu").style.display = "none";
}

// switch between menu pages
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
        document.getElementById(pageId).style.display = "block";
    }
}

updatePlayerDisplay();
