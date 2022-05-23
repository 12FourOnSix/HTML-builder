const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filepath = path.join(__dirname, 'text.txt');
const output = fs.createWriteStream(filepath);
const rl = readline.createInterface(
  { input: process.stdin }
);

console.log('Привет!\nЭто приложение поможет вам записать текст в файл!\n');
console.log('Для записи в файл введите в консоль текст.');
console.log('Для выхода введите "exit" или используйте комбинацию клавиш "ctrl + c"\n');

function handleLine(line) {
  try {
    const hasExitInLine = line.match(/exit/gi);

    if (hasExitInLine) {
      process.exit();
    }
    output.write(`${line}\n`);

  } catch (error) {
    console.error('Error: ', error);
  }
}

function handleExitProcess() {
  console.log('\nДанные успешно записаны в файл. \nХорошего дня!');
}

rl.on('line', (line) => { handleLine(line); } );

process.on('SIGINT', () => { process.exit(); });
process.on('exit', handleExitProcess);


