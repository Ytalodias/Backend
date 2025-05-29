// main.js

import readline from 'readline';
import { questionGenerator } from './quizModule.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const gen = questionGenerator();
let score = 0;

function askQuestion() {
  const next = gen.next();

  if (next.done) {
    console.log(`\nFim do quiz! Você acertou ${score} de 3 perguntas.`);
    rl.close();
    return;
  }

  const q = next.value;
  console.log(`\n${q.question}`);
  q.options.forEach((opt, index) => {
    console.log(`${index}: ${opt}`);
  });

  rl.question('Sua resposta: ', (input) => {
    const choice = parseInt(input);
    if (choice === q.answer) {
      console.log("✅ Resposta correta!");
      score++;
    } else {
      console.log(`❌ Errado! A resposta correta é: ${q.options[q.answer]}`);
    }
    askQuestion();
  });
}

askQuestion();
