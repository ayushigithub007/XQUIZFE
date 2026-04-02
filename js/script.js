// Quiz questions array
const questions = [
  {
    text: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correct: 2
  },
  {
    text: "Which language is used for web apps?",
    options: ["Python", "JavaScript", "C++", "Java"],
    correct: 1
  },
  {
    text: "Which HTML tag is used to include JavaScript?",
    options: ["<script>", "<js>", "<javascript>", "<code>"],
    correct: 0
  },
  {
    text: "Which CSS property changes text color?",
    options: ["color", "font-style", "background", "text-align"],
    correct: 0
  },
  {
    text: "Which operator is used for assignment in JavaScript?",
    options: ["=", "==", "===", "+="],
    correct: 0
  }
];

let current = 0;
let score = 0;
let submitted = false;

// DOM elements
const questionEl = document.getElementById("question");
const answerList = document.getElementById("answer-list");
const submitBtn = document.getElementById("submit");
const nextBtn = document.getElementById("next");

// Render question
function renderQuestion() {
  const q = questions[current];

  questionEl.textContent = q.text;
  answerList.innerHTML = "";

  q.options.forEach((opt, i) => {
    const li = document.createElement("li");
    li.className = "option-item";
    li.dataset.index = i;

    li.innerHTML = `
      <input type="radio" name="option" value="${i}">
      <label>${opt}</label>
    `;

    answerList.appendChild(li);
  });

  submitted = false;
  submitBtn.style.display = "inline-block";
  nextBtn.style.display = "none";
}

function getSelected() {
  const checked = document.querySelector("input[name='option']:checked");
  return checked ? Number(checked.value) : null;
}

// Submit button logic
submitBtn.addEventListener("click", () => {
  const selected = getSelected();

  if (selected === null) {
    alert("Please select an answer!");
    return;
  }

  submitted = true;

  const correctIndex = questions[current].correct;
  const items = answerList.querySelectorAll(".option-item");

  items.forEach((li) => {
    const idx = Number(li.dataset.index);

    if (idx === correctIndex) li.classList.add("correct");
    li.classList.add("disabled");
  });

  if (selected === correctIndex) score++;

  submitBtn.style.display = "none";
  nextBtn.style.display = "inline-block";
});

// Next button logic
nextBtn.addEventListener("click", () => {
  current++;

  if (current >= questions.length) {
    alert(`Quiz finished! Your score is: ${score}/${questions.length}`);
    current = 0;
    score = 0;
  }

  renderQuestion();
});

// Initial load
renderQuestion();
