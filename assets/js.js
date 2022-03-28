import "./styles.css";
import { hpQuestions } from "./hp_questions";

(function () {
  var game = {
    init: function () {
      this.cacheElements();
      this.addEventListeners();
      this.populateQuestion();
      this.play();
    },
    cacheElements: function () {
      this.answerContainerEl = document.querySelector("#answersContainer");
      this.answerListEl = this.answerContainerEl.querySelector("#answersList");
      this.answers = this.answerContainerEl.querySelectorAll("li");
      this.statsEl = document.querySelector("#stats");
      this.scoreEl = this.statsEl.querySelector("#score");
      this.playCountDownContainerEl = document.querySelector(
        "#playCountDownContainer"
      );
      this.playCountDownEl = document.querySelector("#playCountDown");
      this.gameOverContainerEle = document.querySelector("#gameOver");
      this.finalScoreEl = document.querySelector("#finalScore");
      console.log("this.finalScoreEl", this.finalScoreEl);
    },
    setStates: function (state) {
      switch (state) {
        case 2:
          this.answerListEl.innerHTML = "";
          this.gameOverContainerEle.classList.add("show");
          this.finalScoreEl.innerText = this.finalScore;
          break;
        case 3:
          this.currentQuestion++;
          this.currentPlayerAnswer = null;
          this.currentAnswer = this.hpQuestions[this.currentQuestion].answer;
          this.answerListEl.innerHTML = "";
          this.populateQuestion();
          this.play();
          break;
        default:
          break;
      }
    },
    scoring: {
      0: 1000,
      1: 100,
      2: 50,
      3: 10
    },
    hpQuestions: hpQuestions,
    currentQuestion: 0,
    currentAnswer: 1,
    currentPlayerAnswer: null,
    score: 0,
    finalScore: 0,
    populateQuestion: function () {
      var self = this;
      console.log(self);
      this.hpQuestions[this.currentQuestion].answers.forEach(function (
        question,
        idx
      ) {
        const liEle = document.createElement("li");
        liEle.innerText = idx + 1 + ". " + question;
        self.answerListEl.appendChild(liEle);
      });
    },
    getAnswersEls: function () {
      return this.answerContainerEl.querySelectorAll("li");
    },
    toggleSelectedAnswerEl: function (idx) {
      var answersEls = this.getAnswersEls();
      answersEls.forEach(function (answer) {
        answer.classList.remove("selected");
      });
      answersEls[idx].classList.add("selected");
    },
    addEventListeners: function () {
      var self = this;
      document.addEventListener("keydown", function (evt) {
        var letter = evt.key.toLowerCase();
        switch (letter) {
          case "1":
            self.currentPlayerAnswer = 0;
            self.toggleSelectedAnswerEl(0);
            break;
          case "2":
            self.currentPlayerAnswer = 1;
            self.toggleSelectedAnswerEl(1);
            break;
          case "3":
            self.currentPlayerAnswer = 2;
            self.toggleSelectedAnswerEl(2);
            break;
          case "4":
            self.currentPlayerAnswer = 3;
            self.toggleSelectedAnswerEl(3);
            break;
          default:
            self.currentPlayerAnswer = null;
        }
      });
    },
    play: function () {
      var readyCounter = 2;
      var self = this;
      const answers = self.answerListEl.querySelectorAll("li");
      var readySetGo = setInterval(function () {
        self.playCountDownEl.innerText = readyCounter + 1;
        if (readyCounter === 0) {
          clearInterval(readySetGo);
          self.playCountDownContainerEl.classList.add("hide");
        }
        readyCounter--;
      }, 1000);
      setTimeout(function () {
        var counter = 0;
        var scored = false;
        if (self.currentPlayerAnswer === self.currentAnswer) {
          self.score = self.scoring[0];
          scored = true;
        }
        var interval = setInterval(function () {
          if (self.currentAnswer !== counter) {
            answers[counter].classList.add("hide");
          }
          counter++;
          if (self.currentPlayerAnswer === self.currentAnswer && !scored) {
            self.score = self.scoring[counter];
            self.finalScore = self.finalScore + self.score;
            scored = true;
          }
          if (counter === 4) {
            clearInterval(interval);
            self.scoreEl.innerText = self.score;
            answers[self.currentAnswer].classList.add("glow");
            setTimeout(function () {
              if (self.hpQuestions.length - 1 === self.currentQuestion) {
                self.setStates(2);
              } else {
                self.setStates(3);
              }
            }, 5000);
          }
        }, 3000);
      }, 2000);
    }
  };

  game.init();
})();
