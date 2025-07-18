window.onload = function () {
    let round = 0;
    const maxRounds = 21;

    let currentQuestion = 1;
    const totalQuestions = 21;

    let buttonData = [];
    const Answer = [2, 2, 1, 2, 2, 2, 2, 1, 3, 3, 5, 1, 1, 2, 2, 2, 2, 2, 2, 4];

    const countdownText = document.querySelector(".countdown-text");


    let countdown;

//-------------------------------------------------------------------------------------//
    function startCountdown() {
        if (round >= maxRounds) return; // ✅ หยุดทันทีถ้าเกินจำนวนรอบ
        showNextQuestion();

        if (round < maxRounds) {
            let timeLeft = 5;
            countdownText.textContent = timeLeft;

            countdown = setInterval(() => {
                timeLeft--;
                countdownText.textContent = timeLeft;

                if (timeLeft <= 0) {
                    clearInterval(countdown);
                    addButtonData(99);

                    setTimeout(() => {
                        round++;
                        currentQuestion = round + 1;
                        if (round < maxRounds) {
                            showNextQuestion();
                            startCountdown();
                        } else {
                            countdownText.style.display = 'none';
                            showScore();

                        }
                    }, 1000);
                }
            }, 1000);
        }
    }

//-------------------------------------------------------------------------------------//
    function handleButtonClick(button) {
        
        clearInterval(countdown);

        if (button === "redButton") {
            addButtonData(1);
        } else if (button === "orangeButton") {
            addButtonData(2);
        } else if (button === "yellowButton") {
            addButtonData(3);
        } else if (button === "greenButton") {
            addButtonData(4);
        } else if (button === "whiteButton") {
            addButtonData(5);
        } else {
            addButtonData(99);
        }

        round++;
        currentQuestion = round + 1;

        if (round < maxRounds) {
            showNextQuestion();
            startCountdown();
        } else {
            countdownText.style.display = "none";
        }
    }

//-------------------------------------------------------------------------------------//
    function addButtonData(value) {
        if (buttonData.length >= maxRounds-1) return;
        buttonData.push(value);
        console.log(buttonData);
    }

//-------------------------------------------------------------------------------------//
    function showNextQuestion() {
        for (let i = 1; i <= totalQuestions; i++) {
            const question = document.getElementById(`Q${i}`);
            if (question) {
                question.style.display = "none";
            }
        }

        const questionToShow = document.getElementById(`Q${currentQuestion}`);
        if (questionToShow) {
            questionToShow.style.display = "block";
        }
    }

    // Event listeners
    document.getElementById("redButton").addEventListener("click", function () {
        handleButtonClick("redButton");
    });
    document.getElementById("orangeButton").addEventListener("click", function () {
        handleButtonClick("orangeButton");
    });
    document.getElementById("yellowButton").addEventListener("click", function () {
        handleButtonClick("yellowButton");
    });
    document.getElementById("greenButton").addEventListener("click", function () {
        handleButtonClick("greenButton");
    });
    document.getElementById("whiteButton").addEventListener("click", function () {
        handleButtonClick("whiteButton");
    });

    //-------------------------------------------------------------------------------------//
function countMatches(Answer, buttonData) {
  let count = 0;
  for (let i = 0; i < Answer.length && i < buttonData.length; i++) {
    if (Answer[i] === buttonData[i]) {
      count++;
    }
  }
    return count;
    }

function showScore() {
                                const matchedCount = countMatches(Answer, buttonData);
                                const scoreDiv = document.getElementById("scoreDisplay");
                                scoreDiv.textContent = `${matchedCount} `;
                            }

    //-------------------------------------------------------------------------------------//


    // เริ่มต้น!
    startCountdown();
};

