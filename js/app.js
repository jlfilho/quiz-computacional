import {
  QuizError,
  advance,
  confirmAnswer,
  createAttempt,
  getCurrentQuestion,
  getResults,
  restart,
  selectAlternative,
  validateQuestions
} from "./quiz.js";

const app = document.querySelector("#app");
let attempt;

function createElement(tag, options = {}) {
  const element = document.createElement(tag);
  if (options.className) element.className = options.className;
  if (options.text) element.textContent = options.text;
  if (options.type) element.type = options.type;
  if (options.attributes) {
    Object.entries(options.attributes).forEach(([name, value]) => element.setAttribute(name, value));
  }
  return element;
}

function clearApp() {
  app.replaceChildren();
  app.setAttribute("aria-busy", "false");
}

function renderError() {
  clearApp();
  const card = createElement("section", { className: "card error-card", attributes: { role: "alert" } });
  card.append(
    createElement("h2", { text: "Não foi possível iniciar o quiz" }),
    createElement("p", { text: "As questões não puderam ser carregadas. Recarregue a página e tente novamente." })
  );
  app.append(card);
}

function renderQuestion() {
  clearApp();
  const question = getCurrentQuestion(attempt);
  const card = createElement("section", { className: "card", attributes: { "aria-labelledby": "question-title" } });
  const progress = createElement("p", { className: "progress", text: `Questão ${attempt.currentQuestionIndex + 1} de ${attempt.questions.length}` });
  const title = createElement("h2", { className: "question-title", text: question.statement, attributes: { id: "question-title" } });
  const list = createElement("ul", { className: "alternatives", attributes: { role: "radiogroup", "aria-label": "Alternativas de resposta" } });
  const letters = ["A", "B", "C", "D"];

  question.alternatives.forEach((alternative, index) => {
    const button = createElement("button", {
      className: `alternative${attempt.selectedIndex === index ? " is-selected" : ""}`,
      type: "button",
      attributes: { role: "radio", "aria-checked": String(attempt.selectedIndex === index) }
    });
    button.append(createElement("span", { className: "alternative-label", text: letters[index] }), createElement("span", { text: alternative }));
    button.addEventListener("click", () => {
      attempt = selectAlternative(attempt, index);
      renderQuestion();
    });
    const item = document.createElement("li");
    item.append(button);
    list.append(item);
  });

  const notice = createElement("p", { className: "notice", attributes: { "aria-live": "assertive" } });
  const confirm = createElement("button", { className: "button", type: "button", text: "Confirmar resposta" });
  confirm.addEventListener("click", () => {
    try {
      attempt = confirmAnswer(attempt);
      renderFeedback();
    } catch (error) {
      if (error instanceof QuizError) {
        notice.textContent = error.message;
        notice.classList.add("is-error");
      } else {
        throw error;
      }
    }
  });

  const actions = createElement("div", { className: "actions" });
  actions.append(confirm);
  card.append(progress, title, list, notice, actions);
  app.append(card);
}

function renderFeedback() {
  clearApp();
  const question = getCurrentQuestion(attempt);
  const answer = attempt.confirmedAnswers.at(-1);
  const card = createElement("section", { className: "card", attributes: { "aria-labelledby": "feedback-title" } });
  const title = createElement("h2", { className: "question-title", text: question.statement, attributes: { id: "feedback-title" } });
  const list = createElement("ul", { className: "alternatives", attributes: { "aria-label": "Resposta confirmada" } });
  const letters = ["A", "B", "C", "D"];

  question.alternatives.forEach((alternative, index) => {
    let stateClass = "";
    if (index === question.correctIndex) stateClass = " is-correct";
    else if (index === answer.selectedIndex) stateClass = " is-incorrect";
    const button = createElement("button", {
      className: `alternative${stateClass}`,
      type: "button",
      attributes: { disabled: "", "aria-disabled": "true" }
    });
    button.append(createElement("span", { className: "alternative-label", text: letters[index] }), createElement("span", { text: alternative }));
    const item = document.createElement("li");
    item.append(button);
    list.append(item);
  });

  const message = answer.isCorrect
    ? "Resposta correta! Muito bem."
    : `Resposta incorreta. A resposta correta é: ${question.alternatives[question.correctIndex]}.`;
  const feedback = createElement("p", {
    className: `feedback ${answer.isCorrect ? "is-correct" : "is-incorrect"}`,
    text: message,
    attributes: { role: "status" }
  });
  const next = createElement("button", {
    className: "button",
    type: "button",
    text: attempt.currentQuestionIndex === attempt.questions.length - 1 ? "Ver resultado" : "Próxima questão"
  });
  next.addEventListener("click", () => {
    attempt = advance(attempt);
    render();
  });
  const actions = createElement("div", { className: "actions" });
  actions.append(next);
  card.append(title, list, feedback, actions);
  app.append(card);
}

function renderResult() {
  clearApp();
  const results = getResults(attempt);
  const card = createElement("section", { className: "card", attributes: { "aria-labelledby": "result-title" } });
  const title = createElement("h2", { text: "Resultado final", attributes: { id: "result-title" } });
  const intro = createElement("p", { text: "Você concluiu todas as questões do quiz." });
  const grid = createElement("div", { className: "result-grid" });
  [
    [results.correctCount, "Acertos"],
    [results.incorrectCount, "Erros"],
    [`${results.percentage}%`, "Percentual"]
  ].forEach(([value, label]) => {
    const item = createElement("div", { className: "result-item" });
    item.append(createElement("strong", { text: String(value) }), createElement("span", { text: label }));
    grid.append(item);
  });
  const reset = createElement("button", { className: "button", type: "button", text: "Reiniciar quiz" });
  reset.addEventListener("click", () => {
    attempt = restart(attempt);
    renderQuestion();
  });
  const actions = createElement("div", { className: "actions" });
  actions.append(reset);
  card.append(title, intro, grid, actions);
  app.append(card);
}

function render() {
  if (attempt.status === "question") renderQuestion();
  else if (attempt.status === "feedback") renderFeedback();
  else renderResult();
}

async function start() {
  try {
    const response = await fetch("data/questions.json");
    if (!response.ok) throw new QuizError("Falha ao carregar questões.");
    const questions = await response.json();
    validateQuestions(questions);
    attempt = createAttempt(questions);
    renderQuestion();
  } catch (error) {
    renderError();
  }
}

start();
