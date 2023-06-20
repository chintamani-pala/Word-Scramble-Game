var word = "";
var meaning = "";
let length = 5
var timeid;
var timeinc = 0
let timesec = 30;
let suffeledWord = document.getElementById("suffeledWord")
let inputBox = document.getElementById("inputBox")
let slider = document.getElementById("slider")
let hint = document.getElementById("hint")
let time = document.getElementById("time")
let currentScore = document.getElementById("currentScore")
let highestScore = document.getElementById("highestScore")
let result = document.getElementById("result")
let nextWord = document.getElementById("nextWord")
var currentScoreValue = 0
let slidermargin = document.getElementsByClassName("selection")[1];
currentScore.innerHTML = currentScoreValue
var isWin = false;
var wordLength = 3
function getApi(url, contentType) {
    $.ajax({
        method: 'GET',
        url: url,
        contentType: contentType,
        success: function (result) {
            if (url == `https://random-word-api.vercel.app/api?words=1&length=${wordLength}`) {
                [word] = result
                if (timeinc) {
                    clearInterval(timeid)
                    nextWord.innerHTML = "Next"
                }
                let getMeaning = getApi.bind("", `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`, "text/plain")
                getMeaning()
            }
            else if (url == `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`) {
                try {
                    meaning = result[0]["meanings"][0]["definitions"][0]["definition"]
                    if (meaning.split(" ").includes(word)) {
                        meaning = "No Hint Available"
                    }
                }
                catch (err) {
                    meaning = "No Hint Available"
                }
                mainfunc()
            }
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
    });
}
function getWord() {
    getApi.call("", `https://random-word-api.vercel.app/api?words=1&length=${wordLength}`, "text/plain")
}
getApi.call("", `https://random-word-api.vercel.app/api?words=1&length=${wordLength}`, "text/plain")
slider.addEventListener("input", () => {
    wordLength = slider.value
    getitem()
})
getWord()
function mainfunc() {
    currentScoreValue = currentScore.innerHTML
    word = word.toUpperCase()
    let copyword = [...word];
    let newWord = copyword.sort().join("")
    console.log(word)
    suffeledWord.innerHTML = newWord
    nextWord.innerHTML = "Next"
    timeid = setInterval(() => {
        timeinc++
        time.innerHTML = timesec + "s"
        timesec--
        if (timesec == -1) {
            clearInterval(timeid)
            // time.innerHTML="You Lost"
            result.innerHTML = `You Lost , The answer is ${word}`
            slidermargin.style.marginTop = "15px"
            nextWord.disabled = false
            inputBox.disabled = true
        }
    }, 1000)
    hint.innerHTML = meaning
    inputBox.addEventListener("keyup", () => {
        if ((inputBox.value).toUpperCase() == word) {
            inputBox.disabled = true
            result.style.color = "white"
            result.innerHTML = "Wow You Win"
            slidermargin.style.marginTop = "15px"
            clearInterval(timeid)
            currentScore.innerHTML = +currentScoreValue + 1
            nextWord.disabled = false
        }
    })
}
function getitem() {
    slidermargin.style.marginTop = "45px"
    result.innerHTML = ""
    inputBox.value = ""
    inputBox.disabled = false
    // nextWord.disabled = true;
    clearInterval(timeid)
    timesec = 30
    nextWord.innerHTML = "Loading..."
    getApi.call("", `https://random-word-api.vercel.app/api?words=1&length=${wordLength}`, "text/plain")
}






