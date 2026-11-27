'use strict';

// One enemy per map location - going to map a proper enemy layout so player doesn't get stuck
const enemies = {
    satan_point: {
        name: "Martial Artist",
        image: "images/bandit.jpg",
        health: 5,
        xp: 10
    },
    pilaf_point: {
        name: "Android 17",
        image: "images/android17.jpg",
        health: 10,
        xp: 30
    },
    central_point: {
        name: "Cell",
        image: "images/celldbz.png",
        health: 8,
        xp: 25
    }
};

// battle state
let currentEnemy = null;
let battleLocationId = null;
let battleActive = false;

// locations whose enemy was beaten - they never come back for the current run
const defeatedEnemies = new Set();

// roll from 1 to 3
function rollDamage() {
    return Math.floor(Math.random() * 3) + 1;
}

function showMessage(message) {
    document.getElementById("battle-message").textContent = message;
}

function setActionsEnabled(enabled) {
    document.querySelectorAll("#battle-actions button").forEach(btn => {
        btn.disabled = !enabled;
    });
}

function updateEnemyDisplay() {
    if (!currentEnemy) return;
    document.getElementById("enemy-name").textContent = currentEnemy.name;
    document.getElementById("enemy-image").src = currentEnemy.image;
    document.getElementById("enemy-health").textContent =
        currentEnemy.health + "/" + currentEnemy.maxHealth;
}

// hide the encounter panel and clear the fight
function endEncounter() {
    battleActive = false;
    currentEnemy = null;
    battleLocationId = null;
    document.getElementById("encounter").classList.add("hidden");
    document.getElementById("fight-again").classList.add("hidden");
}

// called when the player arrives at a location
function startEncounter(locationId) {
    endEncounter();
    const template = enemies[locationId];
    if (!template || defeatedEnemies.has(locationId)) {
        return;
    }
    battleLocationId = locationId;
    currentEnemy = {
        ...template,
        maxHealth: template.health
    };
    battleActive = true;
    // Hide the location/conversation page
    // and show the battle page instead.
    changeSection(locationPage, battlePage);
    document.getElementById("encounter").classList.remove("hidden");
    setActionsEnabled(true);
    updateEnemyDisplay();
    showMessage("A " + currentEnemy.name + " appears!");
    updatePlayerDisplay();
}

function attackEnemy() {
    if (!battleActive) return;
    const damage = rollDamage();
    currentEnemy.health = Math.max(0, currentEnemy.health - damage);
    updateEnemyDisplay();
    if (currentEnemy.health <= 0) {
        winBattle(damage);
        return;
    }
    enemyTurn(0, "You dealt " + damage + " damage to " + currentEnemy.name + "!");
}

function defendPlayer() {
    if (!battleActive) return;
    const block = rollDamage();
    enemyTurn(block, "You rolled " + block + " defense!");
}

function enemyTurn(playerBlock = 0, prefix = "") {
    if (!battleActive) return;
    const enemyDamage = rollDamage();
    const actualDamage = Math.max(0, enemyDamage - playerBlock);
    takeDamage(actualDamage);

    if (player.health <= 0) {
        battleActive = false;
        playerDefeated();   // defined in script.js
        return;
    }
    showMessage(
        (prefix ? prefix + " " : "") +
        currentEnemy.name + " rolled " + enemyDamage + " damage! " +
        "You blocked " + Math.min(playerBlock, enemyDamage) +
        " and received " + actualDamage + "."
    );
}

function useItem() {
    if (!battleActive) return;
    const healingItem = inventory.find(
        item => item.quantity > 0 && item.heal > 0
    );
    if (!healingItem) {
        showMessage("You have no healing items!");
        return;
    }
    if (player.health === player.maxHealth) {
        showMessage("Your health is already full!");
        return;
    }
    const itemName = healingItem.name;
    const healingAmount = healingItem.heal;
    healPlayer(healingAmount);
    removeItem(itemName);
    enemyTurn(
        0,
        "You used " + itemName + " and restored " +
        healingAmount + " HP!"
    );
}

function runAway() {
    if (!battleActive) return;
    if (Math.random() < 0.7) {
        battleActive = false;
        setActionsEnabled(false);
        document.getElementById("fight-again").classList.remove("hidden");
        showMessage("You successfully escaped! The enemy is still here if you come back.");
    } else {
        enemyTurn(0, "You couldn't escape!");
    }
}

// after running away, start the same fight over
function fightAgain() {
    if (battleActive || !currentEnemy) return;
    currentEnemy.health = currentEnemy.maxHealth;
    battleActive = true;
    document.getElementById("fight-again").classList.add("hidden");
    setActionsEnabled(true);
    updateEnemyDisplay();
    showMessage("You face " + currentEnemy.name + " again!");
}

function winBattle() {
    battleActive = false;
    defeatedEnemies.add(battleLocationId);   // never spawns again
    setActionsEnabled(false);

    const reward = currentEnemy.xp;
    let message = "Victory! You defeated " + currentEnemy.name +
        " and earned " + reward + " XP!";

    const levels = gainXP(reward);
    if (levels > 0) {
        message += " Level up! You are now level " + player.level +
            " (+" + (levels * HEALTH_PER_LEVEL) + " max HP).";
    }
    if (Math.random() < 0.5) {
        addItem("Dumplings", 1);
        message += " You also found some Dumplings!";
    }
    showMessage(message);
}

// full new game: enemies come back
function resetBattleProgress() {
    defeatedEnemies.clear();
    endEncounter();
}