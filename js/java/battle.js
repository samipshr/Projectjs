'use strict';

const enemies = {
    satan_city: [
        {
            name: "martial aritst",
            image: "eimg/bandit.jpg",
            health: 5,
            xp: 10
        }
    ],
    castle: [
        {
            name: "android 17",
            image: "eimg/android17.jpg",
            health: 10,
            xp: 30
        }
    ],
    capital: [
        {
            name: "Cell",
            image: "eimg/celldbz.png",
            health: 8,
            xp: 15
        }
    ]
};

// battle status - the current state of the fight
let currentEnemy = null;
let battleActive = false;
let defending = false;

// roll from 1 to 3
function rollDamage() {
    return Math.floor(Math.random() * 3) + 1;
}

// battle message
function showMessage(message) {
    document.getElementById("battle-message").textContent = message;
}

// enemy display update
function updateEnemyDisplay() {
    if (!currentEnemy) return;
    document.getElementById("enemy-name").textContent =
        currentEnemy.name;
    document.getElementById("enemy-image").src =
        currentEnemy.image;
    document.getElementById("enemy-health").textContent =
        currentEnemy.health + "/" + currentEnemy.maxHealth;
}

// Battle start
function startBattle() {
    if (battleActive) {
        showMessage("Finish your current battle first!");
        return;
    }
    if (player.health <= 0) {
        showMessage("You need to recover before exploring!");
        return;
    }
    const location = document.getElementById("location").value;
    // background imgry
    const battleSection = document.getElementById("enemy-area");
    battleSection.classList.remove("satan-city", "castle", "capital");
    battleSection.classList.add(location.replace("_", "-"));
    
    const availableEnemies = enemies[location];
    if (!availableEnemies || availableEnemies.length === 0) {
        showMessage("There are no enemies in this location!");
        return;
    }
    const randomIndex = Math.floor(
        Math.random() * availableEnemies.length
    );
    const selectedEnemy = availableEnemies[randomIndex];
    currentEnemy = {
        ...selectedEnemy,
        maxHealth: selectedEnemy.health
    };
    battleActive = true;
    defending = false;
    document.getElementById("current-location").textContent =
        "Location: " +
        document.getElementById("location").selectedOptions[0].textContent;
    updateEnemyDisplay();
    showMessage("A wild " + currentEnemy.name + " appeared!");
}

// Player attacks
function attackEnemy() {
    if (!battleActive) return;
    const damage = rollDamage();
    currentEnemy.health -= damage;
    if (currentEnemy.health < 0) {
        currentEnemy.health = 0;
    }
    updateEnemyDisplay();
    if (currentEnemy.health <= 0) {
        winBattle();
        return;
    }
    showMessage(
        "You rolled " + damage +
        " damage against " + currentEnemy.name + "!"
    );
    enemyTurn();
}

// Player defends
function defendPlayer() {
    if (!battleActive) return;
    defending = true;
    const block = rollDamage();
    showMessage("You rolled " + block + " defense!");
    enemyTurn(block);
}

// Enemy attacks
function enemyTurn(playerBlock = 0) {
    if (!battleActive) return;
    const enemyDamage = rollDamage();
    const actualDamage = Math.max(0,
        enemyDamage - playerBlock
    );
    takeDamage(actualDamage);
    defending = false;
    if (player.health <= 0) {
        battleActive = false;
        showMessage("You were defeated! Recover before fighting again.");
        return;
    }
    showMessage(
        currentEnemy.name + " rolled " + enemyDamage +
        " damage! You blocked " + playerBlock +
        " damage and received " + actualDamage + " damage."
    );
}

// Use item
function useItem() {
    if (!battleActive) return;
    const potion = inventory.find(
        item => item.name === "Dumplings" &&
                item.quantity > 0
    );
    if (!potion) {
        showMessage("You have no food!");
        return;
    }
    if (player.health === player.maxHealth) {
        showMessage("Your health is already full!");
        return;
    }
    const healing = potion.heal;
    healPlayer(healing);
    removeItem("Dumplings");
    showMessage("You restored " + healing + " HP!");
    enemyTurn();
}

// run away - well this fight isn't worth it
function runAway() {
    if (!battleActive) return;
    if (Math.random() < 0.7) {
        battleActive = false;
        showMessage("You successfully escaped!");
    } else {
        showMessage("You couldn't escape!");
        enemyTurn();
    }
}

// WIN/Victory
function winBattle() {
    battleActive = false;
    const reward = currentEnemy.xp;
    showMessage(
        "Victory! You defeated " +
        currentEnemy.name +
        " and earned " + reward + " XP!"
    );
    gainXP(reward);
    if (Math.random() < 0.5) {
        addItem("Dumplings", 1);
        showMessage(
            "Victory! You also found a Health Potion!"
        );
    }
}

