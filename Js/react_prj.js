const questions = [
  {
    question: 'Де ви більш за все проводите часу?',
    answers: [
      { text: 'На роботі', img: 'http://surl.li/olako' },
      { text: 'На свіжому повітрі', img: 'http://surl.li/olaky' },
      { text: 'З друзями', img: 'http://surl.li/olalf' },
      { text: 'Вдома', img: 'http://surl.li/olalj' },
    ]
  },
  {
    question: 'Яке оточення вам імпонує?',
    answers: [
      { text: 'Затишний інтер\'єр', img: 'http://surl.li/olalq' },
      { text: 'Практичний інтер\'єр', img: 'http://surl.li/olame' },
      { text: 'Вишуканий інтер\'єр', img: 'http://surl.li/olamk' },
      { text: 'Мінімалістичний інтер\'єр', img: 'http://surl.li/olams' },
    ]
  },
  {
    question: 'Який тип кухні вам подобається найбільше?',
    answers: [
      { text: 'Домашня кухня', img: 'http://surl.li/olana' },
      { text: 'Доставка їжі', img: 'http://surl.li/olape' },
      { text: 'Висока кухня', img: 'http://surl.li/olapx' },
      { text: 'Фаст-Фуд', img: 'http://surl.li/olaql' },
    ]
  },
  {
    question: 'Як ви відноситесь до розваги під час вечері?',
    answers: [
      { text: 'Віддаю перевагу спокійній бесіді', img: 'http://surl.li/olara' },
      { text: 'Люблю настільні ігри', img: 'http://surl.li/olarp' },
      { text: 'Цікавлюся різноманітними шоу', img: 'http://surl.li/olarv' },
      { text: 'Обожнюю активні розваги', img: 'http://surl.li/olasi' },
    ]
  },
  {
    question: 'Яке обслуговування ви вибираєте під час вечері?',
    answers: [
      { text: 'Самообслуговування', img: 'http://surl.li/olasy' },
      { text: 'Персональне обслуговування', img: 'http://surl.li/olatg' },
      { text: 'Ексклюзивне обслуговування', img: 'http://surl.li/olatt' },
      { text: 'Не маю певних уподобань', img: 'http://surl.li/olatz' },
    ]
  },
  // Додайте інші питання та відповіді
];


let currentQuestion = 0;
let answers = [];

const questionElement = document.getElementById('question');
const answerElement = document.getElementById('answers');
const resultElement = document.getElementById('result');
const recommendationElement = document.getElementById('recommendation');
const submitBtn = document.getElementById('submitBtn');
const restartBtn = document.getElementById('restartBtn');

function showQuestion() {
  const q = questions[currentQuestion];
  questionElement.textContent = q.question;

  answerElement.innerHTML = '';
  q.answers.forEach((answer, index) => {
    const button = document.createElement('button');
    const image = document.createElement('img');
    image.src = answer.img;
    image.alt = answer.text;
    button.appendChild(image);
    button.innerHTML += `<br>${answer.text}`;
    button.onclick = () => handleAnswer(index);
    answerElement.appendChild(button);
  });

  resultElement.style.display = 'none';
  submitBtn.style.display = 'block';
  restartBtn.style.display = 'none';

  
}

function handleAnswer(index) {
  answers.push(index);

  if (currentQuestion === questions.length - 1) {
    showResult();
  } else {
    currentQuestion++;
    showQuestion();
  }
}

function showResult() {
  const counts = Array(questions[currentQuestion].answers.length).fill(0);

  answers.forEach(answer => {
    counts[answer]++;
  });

  const maxCount = Math.max(...counts);
  const recommendation = counts.indexOf(maxCount);

  const places = ['вдома', 'у друзів', 'в ресторані', 'у кафе', /* ...додаткові місця для вечері... */];

  recommendationElement.textContent = `Вам краще за все провести вечір ${places[recommendation]}`;
  resultElement.style.display = 'block';
  submitBtn.style.display = 'none';
  restartBtn.style.display = 'block';
  questionElement.style.display = 'none';
  answerElement.style.display = 'none';
}

function restartTest() {
  currentQuestion = 0;
  answers = [];
  resultElement.style.display = 'none';
  submitBtn.style.display = 'block';
  restartBtn.style.display = 'none';

  // Очищення контенту питання та відповідей
  questionElement.textContent = '';
  answerElement.innerHTML = '';

  // Повернення стилів до вихідних значень
  questionElement.style.display = '';
  answerElement.style.display = '';

  showQuestion();
}



restartBtn.addEventListener('click', restartTest);

showQuestion();