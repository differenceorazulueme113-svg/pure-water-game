let coins = 0;
let multiplier = 1;
let autoSealers = 0;

let tapUpgradeCost = 100;
let autoUpgradeCost = 500;

// Setup Telegram WebApp
const tg = window.Telegram?.WebApp;
if (tg) {
    tg.expand();
}

// DOM elements
const coinCountElement = document.getElementById('coin-count');
const tapTargetElement = document.getElementById('tap-target');
const adBtnElement = document.getElementById('ad-btn');

const upgradeTapBtnElement = document.getElementById('upgrade-tap-btn');
const upgradeAutoBtnElement = document.getElementById('upgrade-auto-btn');
const tapCostElement = document.getElementById('tap-cost');
const autoCostElement = document.getElementById('auto-cost');

// Core Tap Function
if (tapTargetElement) {
    tapTargetElement.addEventListener('click', () => {
        coins += multiplier;
        updateUI();
        if (window.Telegram?.WebApp?.HapticFeedback) {
            tg.HapticFeedback.impactOccurred('medium');
        }
    });
}

// Shop Logic: Manual Sealer Upgrades
if (upgradeTapBtnElement) {
    upgradeTapBtnElement.addEventListener('click', () => {
        if (coins >= tapUpgradeCost) {
            coins -= tapUpgradeCost;
            multiplier += 1;
            tapUpgradeCost = Math.floor(tapUpgradeCost * 1.5);
            updateUI();
        } else {
            alert("Not enough sealed water bags! Keep tapping!");
        }
    });
}

// Shop Logic: Auto-Sealer Upgrades
if (upgradeAutoBtnElement) {
    upgradeAutoBtnElement.addEventListener('click', () => {
        if (coins >= autoUpgradeCost) {
            coins -= autoUpgradeCost;
            autoSealers += 1;
            autoUpgradeCost = Math.floor(autoUpgradeCost * 1.6);
            updateUI();
        } else {
            alert("Not enough sealed water bags! Keep tapping!");
        }
    });
}

// Background Thread for Passive Income (Auto-Sealers)
setInterval(() => {
    if (autoSealers > 0) {
        coins += autoSealers;
        updateUI();
    }
}, 1000);

// UI Update Engine
function updateUI() {
    if (coinCountElement) {
        coinCountElement.innerText = coins;
    }
    if (tapCostElement) {
        tapCostElement.innerText = tapUpgradeCost;
    }
    if (autoCostElement) {
        autoCostElement.innerText = autoUpgradeCost;
    }
}

// AdsGram Integration
const AdController = window.Adsgram?.init({ blockId: "32018" });

if (adBtnElement) {
    adBtnElement.addEventListener('click', () => {
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
}

// Run initial UI draw
updateUI();
