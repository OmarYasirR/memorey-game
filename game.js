
let duration = 1000;
let blockContaner = document.querySelector(".memory-game-blocks");
let overlay = document.querySelector(".over-lay")
let blocks = Array.from(blockContaner.children);
let stopCounting = ""
/* 
Added Feature:-
-Counter.
If the time is over show you lose Popup.
*/
let minutes = document.querySelector(".minutes");
let seconds = document.querySelector(".seconds");
let youLose = document.querySelector(".you-lose");
let tryAgain = document.querySelector(".you-lose button");

function counter() {
    setTimeout(() => {
        seconds.innerHTML = 59;
        minutes.innerHTML = +minutes.innerHTML - 1;
        stopCounting = setInterval(() => {
            if (seconds.innerHTML == 0 && minutes.innerHTML == 0) {
                youLose.style.display = "block";
                overlay.style.display = "block";
                blockContaner.classList.add("un-click");
                clearInterval(stopCounting);
            } else if (seconds.innerHTML == 0 && minutes.innerHTML != 0) {
                minutes.innerHTML -= 1;
                seconds.innerHTML = 59;
            } else {
                seconds.innerHTML -= 1;
            }
        }, duration);
    }, duration);
}
tryAgain.onclick = function () {
    location.reload();
    blockContaner.classList.remove("un-click");
};
console.log(stopCounting)
/*
-Added Feature
show Blocks for 1s
*/

function showblocks() {
    blocks.forEach((block) => {
        block.classList.add("is-flipped");
    });
    setTimeout(() => {
        blocks.forEach((block) => {
            block.classList.remove("is-flipped");
        });
    }, duration);
}

document.querySelector(".control-buttons span").onclick = function () {
    let nam = prompt("enter your name: ");
    if (nam) {
        document.querySelector(".name span").innerHTML = nam;
    } else {
        document.querySelector(".name span").innerHTML = "Unkwon";
    }
    document.querySelector(".control-buttons").remove();
    showblocks();
    counter();
};

// Generate random unique order range for game blocks.
let uniqueOrder = [];
let orderRenge = new Set();
let flippedBlocksCounter = 0;

while (orderRenge.size < blocks.length) {
    orderRenge.add(Math.trunc(Math.random() * blocks.length));
}
orderRenge.forEach((el) => uniqueOrder.push(el));

blocks.forEach((block, index) => {
    block.style.order = uniqueOrder[index];
    block.addEventListener("click", function () {
        flipBlock(block);
    });
});

function flipBlock(selactedBlock) {
    selactedBlock.classList.add("is-flipped");
    let allFlippedBlocks = blocks.filter((flipedblock) =>
        flipedblock.classList.contains("is-flipped")
    );
    if (allFlippedBlocks.length === 2) {
        stopClicking();
        matchingBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
    }
}
function stopClicking() {
    blockContaner.classList.add("un-click");
    setTimeout(() => {
        blockContaner.classList.remove("un-click");
    }, duration);
}

function matchingBlocks(feristBlock, secondBlock) {
    let tries = document.querySelector(".tries span");
    if (feristBlock.dataset.technology === secondBlock.dataset.technology) {
        feristBlock.classList.remove("is-flipped");
        secondBlock.classList.remove("is-flipped");
        flippedBlocksCounter += 1;
        feristBlock.classList.add("has-match");
        secondBlock.classList.add("has-match");
    } else {
        /*
        Added feature:
        If wrong tries equal to 15 you lose
        */        
        if (tries.innerHTML == 20) {
            youLose.style.display = "block";
            overlay.style.cssText = "display: block";
            blockContaner.classList.add("un-click");
            clearInterval(stopCounting);
        }else{ 
        tries.innerHTML = parseInt(tries.innerHTML) + 1;
    }
        setTimeout(() => {
            feristBlock.classList.remove("is-flipped");
            secondBlock.classList.remove("is-flipped");
        }, duration);
    }
    checkAllBlocks();
}

/*
Added Feature:
Check All Blocks to detects blocks are flipped or not.
If they are flipped show congratulation popup and play again.
 */
function checkAllBlocks() {
    let youWin = document.querySelector(".you-win");

    if (flippedBlocksCounter == 10) {
        youWin.style.cssText = "display: block";
        overlay.style.cssText = "display: block";
        clearInterval(stopCounting);
    } else {
        youWin.style.cssText = "display: none";
    }
}
let playAgain = document.querySelector(".you-win button");
playAgain.onclick = function () {
    location.reload();
};
