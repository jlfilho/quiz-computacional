export class QuizError extends Error {}

function cloneAttempt(attempt, changes = {}) {
  return {
    ...attempt,
    ...changes,
    confirmedAnswers: changes.confirmedAnswers ?? [...attempt.confirmedAnswers]
  };
}

export function validateQuestions(questions) {
  if (!Array.isArray(questions) || questions.length !== 10) {
    throw new QuizError("O quiz deve conter exatamente 10 questões.");
  }

  const ids = new Set();
  questions.forEach((question, index) => {
    if (!question || typeof question.id !== "string" || question.id.trim() === "" || ids.has(question.id)) {
      throw new QuizError(`A questão ${index + 1} possui um identificador inválido.`);
    }
    ids.add(question.id);

    if (typeof question.statement !== "string" || question.statement.trim() === "") {
      throw new QuizError(`A questão ${index + 1} precisa de um enunciado.`);
    }
    if (!Array.isArray(question.alternatives) || question.alternatives.length !== 4 ||
        question.alternatives.some((alternative) => typeof alternative !== "string" || alternative.trim() === "")) {
      throw new QuizError(`A questão ${index + 1} deve possuir exatamente quatro alternativas válidas.`);
    }
    if (!Number.isInteger(question.correctIndex) || question.correctIndex < 0 || question.correctIndex > 3) {
      throw new QuizError(`A questão ${index + 1} deve possuir uma única alternativa correta válida.`);
    }
  });

  return questions;
}

export function createAttempt(questions) {
  validateQuestions(questions);
  return {
    questions,
    currentQuestionIndex: 0,
    selectedIndex: null,
    confirmedAnswers: [],
    correctCount: 0,
    incorrectCount: 0,
    status: "question"
  };
}

export function getCurrentQuestion(attempt) {
  return attempt.questions[attempt.currentQuestionIndex];
}

export function selectAlternative(attempt, selectedIndex) {
  if (attempt.status !== "question") {
    throw new QuizError("A resposta desta questão já foi confirmada.");
  }
  if (!Number.isInteger(selectedIndex) || selectedIndex < 0 || selectedIndex > 3) {
    throw new QuizError("Selecione uma alternativa válida.");
  }
  return cloneAttempt(attempt, { selectedIndex });
}

export function confirmAnswer(attempt) {
  if (attempt.status !== "question") {
    throw new QuizError("A resposta desta questão já foi confirmada.");
  }
  if (attempt.selectedIndex === null) {
    throw new QuizError("Selecione uma alternativa antes de confirmar.");
  }

  const question = getCurrentQuestion(attempt);
  const isCorrect = attempt.selectedIndex === question.correctIndex;
  const confirmedAnswer = {
    questionId: question.id,
    selectedIndex: attempt.selectedIndex,
    isCorrect
  };

  return cloneAttempt(attempt, {
    confirmedAnswers: [...attempt.confirmedAnswers, confirmedAnswer],
    correctCount: attempt.correctCount + (isCorrect ? 1 : 0),
    incorrectCount: attempt.incorrectCount + (isCorrect ? 0 : 1),
    status: "feedback"
  });
}

export function advance(attempt) {
  if (attempt.status !== "feedback") {
    throw new QuizError("Confirme a resposta antes de avançar.");
  }
  if (attempt.currentQuestionIndex === attempt.questions.length - 1) {
    return cloneAttempt(attempt, { status: "result" });
  }
  return cloneAttempt(attempt, {
    currentQuestionIndex: attempt.currentQuestionIndex + 1,
    selectedIndex: null,
    status: "question"
  });
}

export function getResults(attempt) {
  const total = attempt.questions.length;
  return {
    correctCount: attempt.correctCount,
    incorrectCount: attempt.incorrectCount,
    percentage: Math.round((attempt.correctCount / total) * 100)
  };
}

export function restart(attempt) {
  return createAttempt(attempt.questions);
}
