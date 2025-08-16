const sentences = [
    "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    "Aliquam nemo saepe in ex magnam nostrum non quod beatae.",
    "Tempore eveniet quas cumque, eligendi voluptatibus aliquid.",
    "Praesentium deserunt dolore ullam aperiam facere maiores.",
    "Eum molestias reprehenderit provident minima dolore itaque.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Integer nec odio. Praesent libero. Sed cursus ante dapibus diam."
];
const refDiv = document.getElementById("reference");
const text = document.getElementById("text");
const wc = document.getElementById("wc");
const time = document.getElementById("timer");
const resultDiv = document.getElementById("result");
const totalWordsSpan = document.getElementById("totalWords");
const retryBtn = document.getElementById("retryBtn");
const leaderboardBtn = document.getElementById("leaderboardBtn");
const typedWordsSpan = document.getElementById("typedWords");
const correctWordsSpan = document.getElementById("correctWords");
const wrongWordsSpan = document.getElementById("wrongWords");


let seconds = 60;
let timer;
let isTyping = false;
let refText = "";

function getRandomText() {
    const count = 2 + Math.floor(Math.random() * 2);
    let arr = [];
    for (let i = 0; i < count; i++) {
        arr.push(sentences[Math.floor(Math.random() * sentences.length)]);
    }
    return arr.join(" ");
}


function highlight(currentOnly = true) {
    const typedText = text.value;
    let html = "";

for (let i = 0; i < refText.length; i++) {
    if (i < typedText.length) {
       
        if (typedText[i] === refText[i]) {
            html += `<span class="highlight">${refText[i]}</span>`;
        } else {
            html += `<span class="incorrect">${refText[i]}</span>`;
        }
    } else if (i === typedText.length) {
        html += `<span class="current">${refText[i]}</span>`;
    } else {
        html += currentOnly ? refText[i] : `<span>${refText[i]}</span>`;
    }
}

refDiv.innerHTML = html;
}
function getWords(text) {
    return text.match(/\b\w+\b/g) || [];
}

function showResult() {
    const typedWordsArray = getWords(text.value);
    const referenceWordsArray = getWords(refText);

    let wrongCount = 0;
    let correctCount = 0;

    let resultHtml = "";
    for (let i = 0; i < referenceWordsArray.length; i++) {
        if (typedWordsArray[i] === undefined) {
            resultHtml += `<span class="untyped">${referenceWordsArray[i]}</span> `;
        } else if (typedWordsArray[i] !== referenceWordsArray[i]) {
            wrongCount++;
            resultHtml += `<span class="incorrect">${referenceWordsArray[i]}</span> `;
        } else {
            correctCount++;
            resultHtml += `<span class="highlight">${referenceWordsArray[i]}</span> `;
        }
    }

    refDiv.innerHTML = resultHtml;

    totalWordsSpan.textContent = referenceWordsArray.length;
    typedWordsSpan.textContent = typedWordsArray.length;
    correctWordsSpan.textContent = correctCount;
    wrongWordsSpan.textContent = wrongCount;
    resultDiv.style.display = "block";
    text.disabled = true;

    fetch("/typing-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            totalWords: referenceWordsArray.length,
            typeWords: typedWordsArray.length,
            correctWords: correctCount,
            incorrectWords: wrongCount
        })
    })
    .then(res => res.json())
    .then(data => console.log("Result saved:", data))
    .catch(err => console.error("Error saving result:", err));
}



function startTimer() {
    if (!isTyping) {
        isTyping = true;
        timer = setInterval(() => {
            seconds--;
            time.textContent = Math.floor(seconds / 60) + ":" + (seconds % 60 < 10 ? "0" : "") + (seconds % 60);
            if (seconds <= 0) {
                clearInterval(timer);
                isTyping = false;
                showResult();
            }
        }, 1000);
    }
}

function initTest() {
    refText = getRandomText();
    refDiv.textContent = refText;
    text.value = "";
    wc.textContent = "0";
    seconds = 60;
    time.textContent = "1:00";
    text.disabled = false;
    resultDiv.style.display = "none";
    highlight();
}

initTest();

text.addEventListener("focus", startTimer);

text.addEventListener("input", () => {
    wc.textContent = text.value.trim().split(/\s+/).filter(w => w.length > 0).length;
    highlight();
});

retryBtn.addEventListener("click", initTest);

leaderboardBtn.addEventListener("click", () => {
    const game = "typing-test";
    window.location.href = `/leaderboard/${game}`;
});

