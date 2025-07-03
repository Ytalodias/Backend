const EventEmitter = require('events');
const readline = require('readline');

class TaskManager extends EventEmitter {
  constructor() {
    super();
    this.tasks = {};
  }

  createTask(name) {
    if (this.tasks[name]) {
      console.log(`❌ A tarefa "${name}" já existe.`);
      return;
    }

    const timeout = setTimeout(() => {
      this.completeTask(name);
    }, 3000);

    this.tasks[name] = {
      name,
      status: 'pendente',
      timeout
    };

    this.emit('taskCreated', name);
  }

  completeTask(name) {
    const task = this.tasks[name];
    if (!task || task.status !== 'pendente') return;

    task.status = 'concluída';
    this.emit('taskCompleted', name);
  }

  cancelTask(name) {
    const task = this.tasks[name];
    if (!task) {
      console.log(`❌ A tarefa "${name}" não existe.`);
      return;
    }
    if (task.status !== 'pendente') {
      console.log(`⚠️ A tarefa "${name}" já foi ${task.status}.`);
      return;
    }

    clearTimeout(task.timeout);
    task.status = 'cancelada';
    this.emit('taskCancelled', name);
  }

  listTasks() {
    console.log('\n📋 Lista de tarefas:');
    if (Object.keys(this.tasks).length === 0) {
      console.log('Nenhuma tarefa cadastrada.\n');
      return;
    }

    for (const taskName in this.tasks) {
      const task = this.tasks[taskName];
      console.log(`- ${task.name}: ${task.status}`);
    }
    console.log();
  }
}

const taskManager = new TaskManager();

// Eventos
taskManager.on('taskCreated', (name) => {
  console.log(`✅ Tarefa "${name}" criada.`);
});

taskManager.on('taskCompleted', (name) => {
  console.log(`🎉 Tarefa "${name}" concluída automaticamente!`);
});

taskManager.on('taskCancelled', (name) => {
  console.log(`🚫 Tarefa "${name}" cancelada.`);
});

// Interface readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Comando> '
});

console.log('📌 Gerenciador de Tarefas Iniciado!');
console.log('Comandos: create <nome>, cancel <nome>, list, exit');
rl.prompt();

rl.on('line', (line) => {
  const [command, ...args] = line.trim().split(' ');
  const taskName = args.join(' ');

  switch (command) {
    case 'create':
      if (!taskName) {
        console.log('⚠️ Especifique o nome da tarefa.');
        break;
      }
      taskManager.createTask(taskName);
      break;

    case 'cancel':
      if (!taskName) {
        console.log('⚠️ Especifique o nome da tarefa a cancelar.');
        break;
      }
      taskManager.cancelTask(taskName);
      break;

    case 'list':
      taskManager.listTasks();
      break;

    case 'exit':
      console.log('👋 Encerrando o gerenciador de tarefas...');
      rl.close();
      process.exit(0);
      break;

    default:
      console.log(`❓ Comando desconhecido: ${command}`);
  }

  rl.prompt();
});
