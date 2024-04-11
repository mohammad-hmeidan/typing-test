// const words = ["Hello","Programmer","Code","Javascript","Country","Testing","Town","Linkedin","Twitter"];
const word = {
    "1":["hello","code","town"],
    "2":["abroad","around","couble","accept","caught","arrive","course"],
    "3":["programmer","javascript","linkedin","nagualizm","showbizzy","blackjack"]
}
const lvls = {
    "Easy":6,
    "Normal":4,
    "Hard":2
};
let defaultLevelName = "Easy";
let defaultLevelSeconds = lvls[defaultLevelName];
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLiftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
let level = 1;
let buttonNextGame = document.querySelector(".finish .button-good");
let buttonReturnGame = document.querySelector(".finish .button-bad");
let numberLevelActive = Array.from(document.querySelectorAll(".number-level ul li")) ;

// #######

lvlNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSeconds;
timeLiftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = word[level].length
// Disable Paste Event
input.onpaste = function(){
    return false;
}
//choose your level
let yourLevel = Array.from(document.querySelectorAll(".game .container .levels .content div")) 
yourLevel.forEach((e)=>{
    e.addEventListener("click",(ele)=>{
        yourLevel.forEach((e)=>{
            e.classList.remove("active")
        })
        e.classList.add("active");
        defaultLevelName = e.innerHTML;
        defaultLevelSeconds = lvls[defaultLevelName];
        lvlNameSpan.innerHTML = defaultLevelName;
        secondsSpan.innerHTML = defaultLevelSeconds;
        timeLiftSpan.innerHTML = defaultLevelSeconds;
    })
})
startButton.onclick = function(){
    this.remove();
    yourLevel[0].parentElement.parentElement.style.display = "none"
    input.focus();
    genWords();
    document.querySelector(".number-level").style.display = "flex"
}
function genWords(){
    let randomWord = word[level][Math.floor(Math.random() * word[level].length)];
    let wordIndex = word[level].indexOf(randomWord)
    word[level].splice(wordIndex,1);
    theWord.innerHTML = randomWord;
    upcomingWords.innerHTML = "";
    for(let i=0;i<word[level].length;i++){
        let newdiv = document.createElement("div");
        newdiv.innerHTML = word[level][i];
        upcomingWords.appendChild(newdiv)
    }
    startPlay();
}
function startPlay(){
    timeLiftSpan.innerHTML = defaultLevelSeconds;
    let start = setInterval(()=>{
        timeLiftSpan.innerHTML--;
        if (timeLiftSpan.innerHTML ==="0") {
            clearInterval(start);
            if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
                input.value = "";
                scoreGot.innerHTML++;
                
                if (word[level].length>0) {
                    genWords();
                }else{
                    let span = document.createElement("span");
                    span.className = "good";
                    span.innerHTML = "Congratz";
                    finishMessage.prepend(span);
                    buttonNextGame.style.display = "block"
                }
            }else{
                let span = document.createElement("span");
                span.className = "bad"
                span.innerHTML = "Game over"
                finishMessage.prepend(span)
                buttonReturnGame.style.display = "flex"
            }
        }
    },1000)
}
buttonNextGame.addEventListener("click",()=>{
    level++;
    scoreTotal.innerHTML = word[level].length
    numberLevelActive.forEach((e)=>{
        e.classList.remove("active")
    });
    numberLevelActive[level - 1].classList.add("active")
    scoreGot.innerHTML = "0"
    if (level<=3) {
        genWords();        
        buttonNextGame.style.display = "none";
        document.querySelector(".finish span").remove();
        input.focus();
    }
});
buttonReturnGame.addEventListener("click",()=>{
    window.location.reload();
})