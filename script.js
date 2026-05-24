let coins = 0;
let multiplier = 1;
let autoSealers = 0;

let tapUpgradeCost = 100;
let autoUpgradeCost = 500;

// Setup Telegram WebApp
const tg = window.Telegram.WebApp;
tg.expand();

// DOM elements
const coinCount = document.getElementById('coin-count');
const tapTarget = document.getElementById('tap-target');
const adBtn = document.getElementById('ad-btn');

const upgradeTapBtn = document.getElementById('upgrade-tap-btn');
const upgradeAutoBtn = document.getElementById('upgrade-auto-btn');
const tapCostEl = document.getElementById('tap-cost');
const autoCostEl = document.getElementById('auto-cost');

// Core Tap Function
tapTarget.addEventListener('click', () => {
    coins += multiplier;
    updateUI();
    if (window.Telegram?.WebApp?.HapticFeedback) {
        tg.HapticFeedback.impactOccurred('medium');
    }
});

// Shop Logic: Manual Sealer Upgrades
upgradeTapBtn.addEventListener('click', () => {
    if (coins >= tapUpgradeCost) {
        coins -= tapUpgradeCost;
        multiplier += 1;
        tapUpgradeCost = Math.floor(tapUpgradeCost * 1.5);
        updateUI();
    } else {
        alert("Not enough sealed water bags! Keep tapping!");
    }
});

// Shop Logic: Auto-Sealer Upgrades
upgradeAutoBtn.addEventListener('click', () => {
    if (coins >= autoUpgradeCost) {
        coins -= autoUpgradeCost;
        autoSealers += 1;
        autoUpgradeCost = Math.floor(autoUpgradeCost * 1.6);
        updateUI();
    } else {
        alert("Not enough sealed water bags! Keep tapping!");
    }
});

// Background Thread for Passive Income (Auto-Sealers)
setInterval(() => {
    if (autoSealers > 0) {
        coins += autoSealers;
        updateUI();
    }
}, 1000);

// UI Update Engine
function updateUI() {
    coinCount.innerText = coins;
    if(tapCostEl) tapCostEl.innerText = tapUpgradeCost;
    if(autoCostEl) autoCostEl.innerText = autoUpgradeCost;
}

// AdsGram Integration
const AdController = window.Adsgram?.init({ blockId: "32018" });

adBtn.addEventListener('click', () => {
    if (AdController) {
        AdController.show()
            .then((result) => {
                coins += 500;
                updateUI();
                alert("Awesome! You earned a 500 Bag boost! 🚀");
            })
            .catch((result) => {
                alert("Ad could not load right now. Try again in a moment.");
            });
    } else {
        alert("Ad system initializing... Please wait.");
    }
});

updateUI();
