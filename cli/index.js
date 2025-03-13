const prompts = require('prompts');
const {
  loginCommand,
  createCommand,
  insertCommand,
  readCommand,
  deleteCommand,
  updateCommand,
} = require('./apiGetters');

let loggedIn = false;
let currentDB = null;

async function repl() {
  let prefix = currentDB ? `${currentDB}> ` : 'mpdb> ';
  while (true) {
    const response = await prompts({
      type: 'text',
      name: 'value',
      message: prefix,
    });

    handleInput(response.value);
  }
}

async function handleInput(input) {
  switch (input.toLowerCase()) {
    case 'login':
      await loginPrompts();
      break;
    case 'exit':
      process.exit(0);
      break;
    case 'help':
      console.log(
        'Available commands: exit, help, list, create, insert, update, delete'
      );
      break;
    case 'clear':
    case 'cls':
      console.clear();
      break;
    default:
      await handleCommand(input);
  }
}

async function handleCommand(command) {
  if (!loggedIn) {
    console.log('Please login first using the login command.');
    return;
  }
  tokens = command.split(' ');
  switch (tokens[0]) {
    case 'create':
      await createCommand(command);
      break;
    case 'insert':
      await insertCommand(command);
      break;
    case 'read':
      await readCommand(command);
      break;
    case 'update':
      await updateCommand(command);
      break;
    case 'delete':
      await deleteCommand(command);
      break;
    case 'list':
      await listCommand(command);
      break;
    default:
      console.log('Invalid command. Type help for a list of commands.');
  }
}

async function listCommand(stmt) {
  console.log('Listing records...');
}

async function loginPrompts() {
  // ask for username, then ask for password
  let username = await prompts({
    type: 'text',
    name: 'value',
    message: 'Username: ',
  }).value;
  let password = await prompts({
    type: 'password',
    name: 'value',
    message: 'Password: ',
  }).value;

  // call the login command
  loggedIn = await loginCommand(username, password);
}

module.exports = {
  handleInput,
  handleCommand,
  listCommand,
  loginPrompts,
  setLoggedIn: (value) => {
    loggedIn = value;
  },
  isLoggedIn: () => loggedIn,
};

if (require.main === module) {
  repl();
}
