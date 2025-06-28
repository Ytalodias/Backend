// quizModule.js

const questions = [
  {
    question: "Qual a capital do Brasil?",
    options: ["São Paulo", "Brasília", "Rio de Janeiro", "Salvador"],
    answer: 1
  },
  {
    question: "Qual é o resultado de 2 + 2?",
    options: ["3", "4", "5", "22"],
    answer: 1
  },
  {
    question: "Qual linguagem roda no navegador?",
    options: ["Python", "Java", "C++", "JavaScript"],
    answer: 3
  }
];

export function* questionGenerator() {
  for (const q of questions) {
    yield q;
  }
}
