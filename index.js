let startBtn = document.getElementById("startBtn");
let quizScreen = document.getElementById("quizScreen");
let homeSection = document.getElementById("home");

function change() {
  homeSection.classList.add("hidden");
  quizScreen.classList.remove("hidden");

  renderQuestion();
};

startBtn.onclick = change;

let questions = [
  {
    question: "What is JavaScript?",
    options: ["Language", "Car", "Food", "Animal"],
    answer: 0,
    explanation: "JavaScript is a programming language."
  },
  {
    question: "Which is not a data type?",
    options: ["String", "Boolean", "Car", "Number"],
    answer: 2,
    explanation: "Car is not a data type."
  },

  {
    question: "Which gas is most abundant in Earth’s atmosphere?",
    options: ["Oxygen", "Nitrogen", "CO2", "Hydrogen"],
    answer: 1,
    explanation: "About 78% of Earth’s atmosphere is nitrogen, much more than oxygen (~21%)."
  },

  {
    question: "Who wrote the play Romeo and Juliet?",
    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    answer: 1,
    explanation: "William Shakespeare wrote this famous tragic love story."
  },

  {
    question: "What is the capital of Japan?",
    options: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
    answer: 2,
    explanation: "Tokyo is Japan’s political, economic, and cultural center."
  }


];


let currentQuestion = 0;
let score = 0;
let answered = false;



function renderQuestion() {
  let q = questions[currentQuestion];


  let counter = document.getElementById("questioncounter");
  counter.innerText = "Question " + (currentQuestion + 1) + " of " + questions.length;


  let scoreText = document.getElementById("score");
  scoreText.innerText = "Score: " + score;


  let questionText = document.getElementById("question");
  questionText.innerText = q.question;


  let optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";
  for (let i = 0; i < q.options.length; i++) {
    let btn = document.createElement("button");
    btn.innerText = q.options[i];
    btn.className = "bg-gray-700 p-3 rounded m-2 text-white";
    btn.onclick = function () {
      selectAnswer(i);
    };
    optionsDiv.appendChild(btn);
  }

  let next = document.getElementById("next");
  next.classList.add("hidden");


  let feedback = document.getElementById("feedback")
  feedback.classList.add("hidden");


  answered = false;
}

function selectAnswer(index) {


  if (answered === true) {
    return;
  }

  answered = true;


  let q = questions[currentQuestion];


  let options = document.getElementById("options").children;
  for (let i = 0; i < options.length; i++) {

    options[i].disabled = true;

    if (i === q.answer) {
      options[i].classList.add("bg-green-500");
    }

    if (i === index && index !== q.answer) {
      options[i].classList.add("bg-red-500");
    }
  }


  if (index === q.answer) {
    score = score + 1;
  }


  let feedback = document.getElementById("feedback");

  if (index === q.answer) {
    feedback.innerText = "Correct! " + q.explanation;
    feedback.className = "bg-green-500 p-3 mt-3";
  } else {
    feedback.innerText = "Wrong! " + q.explanation;
    feedback.className = "bg-red-500 p-3 mt-3";
  }

  feedback.classList.remove("hidden");


  document.getElementById("next").classList.remove("hidden");
}

document.getElementById("next").onclick = function () {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    renderQuestion();
  } else {
    showResults();
  }
};

function showResults() {
  const accuracy = Math.round((score / questions.length) * 100);

  quizScreen.innerHTML = `
    <h1 class="text-2xl">Quiz Finished!</h1>
    <p class="mt-4">Score: ${score}</p>
    <p>Accuracy: ${accuracy}%</p>
    <button onclick="location.reload()" class="mt-4 bg-yellow-400 px-4 py-2 rounded">
      Restart
    </button>
  `;
}



