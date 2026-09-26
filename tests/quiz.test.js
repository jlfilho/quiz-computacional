import assert from "node:assert/strict";
import test from "node:test";
import {
  QuizError,
  advance,
  confirmAnswer,
  createAttempt,
  getResults,
  restart,
  selectAlternative,
  validateQuestions
} from "../js/quiz.js";

function makeQuestions() {
  return Array.from({ length: 10 }, (_, index) => ({
    id: `q${index + 1}`,
    statement: `Questão ${index + 1}`,
    alternatives: ["A", "B", "C", "D"],
    correctIndex: 0
  }));
}

function completeAttempt(correctAnswers) {
  let attempt = createAttempt(makeQuestions());
  for (let index = 0; index < 10; index += 1) {
    attempt = selectAlternative(attempt, correctAnswers.includes(index) ? 0 : 1);
    attempt = confirmAnswer(attempt);
    attempt = advance(attempt);
  }
  return attempt;
}

test("valida exatamente 10 questões, IDs únicos e quatro alternativas", () => {
  assert.doesNotThrow(() => validateQuestions(makeQuestions()));
  assert.throws(() => validateQuestions(makeQuestions().slice(0, 9)), QuizError);

  const duplicateId = makeQuestions();
  duplicateId[1].id = duplicateId[0].id;
  assert.throws(() => validateQuestions(duplicateId), /identificador inválido/);

  const invalidAlternatives = makeQuestions();
  invalidAlternatives[0].alternatives = ["A", "B", "C"];
  assert.throws(() => validateQuestions(invalidAlternatives), /quatro alternativas/);

  const invalidCorrectIndex = makeQuestions();
  invalidCorrectIndex[0].correctIndex = 4;
  assert.throws(() => validateQuestions(invalidCorrectIndex), /alternativa correta/);
});

test("cria uma tentativa no estado inicial question", () => {
  const attempt = createAttempt(makeQuestions());
  assert.equal(attempt.status, "question");
  assert.equal(attempt.currentQuestionIndex, 0);
  assert.equal(attempt.selectedIndex, null);
  assert.equal(attempt.confirmedAnswers.length, 0);
  assert.equal(attempt.correctCount, 0);
  assert.equal(attempt.incorrectCount, 0);
});

test("permite trocar a alternativa antes da confirmação", () => {
  let attempt = createAttempt(makeQuestions());
  attempt = selectAlternative(attempt, 2);
  attempt = selectAlternative(attempt, 0);
  assert.equal(attempt.selectedIndex, 0);
});

test("bloqueia confirmação sem alternativa selecionada", () => {
  const attempt = createAttempt(makeQuestions());
  assert.throws(() => confirmAnswer(attempt), /Selecione uma alternativa/);
});

test("confirma resposta, registra resultado e bloqueia alterações", () => {
  let attempt = createAttempt(makeQuestions());
  attempt = selectAlternative(attempt, 1);
  attempt = confirmAnswer(attempt);

  assert.equal(attempt.status, "feedback");
  assert.equal(attempt.confirmedAnswers.length, 1);
  assert.equal(attempt.confirmedAnswers[0].isCorrect, false);
  assert.equal(attempt.correctCount, 0);
  assert.equal(attempt.incorrectCount, 1);
  assert.throws(() => selectAlternative(attempt, 0), /já foi confirmada/);
  assert.throws(() => confirmAnswer(attempt), /já foi confirmada/);
});

test("avança somente após o feedback e nunca retorna para questão anterior", () => {
  let attempt = createAttempt(makeQuestions());
  assert.throws(() => advance(attempt), /Confirme a resposta/);
  attempt = confirmAnswer(selectAlternative(attempt, 0));
  attempt = advance(attempt);
  assert.equal(attempt.status, "question");
  assert.equal(attempt.currentQuestionIndex, 1);
  assert.equal(attempt.selectedIndex, null);
});

test("calcula corretamente resultados de 0, 1, 7 e 10 acertos", () => {
  const cases = [
    [[], 0, 10, 0],
    [[0], 1, 9, 10],
    [[0, 1, 2, 3, 4, 5, 6], 7, 3, 70],
    [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, 0, 100]
  ];

  cases.forEach(([correctAnswers, correctCount, incorrectCount, percentage]) => {
    const attempt = completeAttempt(correctAnswers);
    assert.equal(attempt.status, "result");
    assert.deepEqual(getResults(attempt), { correctCount, incorrectCount, percentage });
    assert.equal(attempt.correctCount + attempt.incorrectCount, 10);
  });
});

test("reinicia a tentativa sem respostas ou pontuação anterior", () => {
  const finishedAttempt = completeAttempt([0, 1, 2]);
  const freshAttempt = restart(finishedAttempt);

  assert.equal(freshAttempt.status, "question");
  assert.equal(freshAttempt.currentQuestionIndex, 0);
  assert.equal(freshAttempt.selectedIndex, null);
  assert.equal(freshAttempt.confirmedAnswers.length, 0);
  assert.equal(freshAttempt.correctCount, 0);
  assert.equal(freshAttempt.incorrectCount, 0);
});
