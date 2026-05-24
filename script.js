const tg = window.Telegram.WebApp;
tg.expand(); 

let coins = 0;
const coinDisplay = document.getElementById('coin-count');
const tapTarget = document.getElementById('tap-target');
const adButton = document.getElementById('ad-btn');

// Haptic feedback tapping engine
tapTarget.addEventListener('click', () => {
    coins += 1;
    coinDisplay.innerText = coins;
    if(tg.HapticFeedback) {
        tg.HapticFeedback.impactOccurred('medium'); 
    }
});

// Using a temporary testing blockId until AdsGram approves your account!
const AdController = window.Adsgram ? window.Adsgram.init({ blockId: "3441" }) : null;

adButton.addEventListener('click', () => {
    if (!AdController) {
        alert("Ad network initialization failed. Check connection.");
        return;
    }
    AdController.show().then((result) => {
        // User successfully completed watching the video ad
        coins += 500; 
        coinDisplay.innerText = coins;
        alert("Awesome! You earned 500 free coins for watching!");
    }).catch((error) => {
        console.log("Ad skipped or blocked:", error);
        alert("Ad couldn't load or was skipped early!");
    });
});
