const prompts = require('prompts');
const {
  handleInput,
  handleCommand,
  listCommand,
  loginPrompts,
  setLoggedIn,
  isLoggedIn,
} = require('./index');

const {
  loginCommand,
  createCommand,
  insertCommand,
  readCommand,
  deleteCommand,
  updateCommand,
} = require('./apiGetters');

jest.mock('./apiGetters');

jest.mock('prompts');
jest.spyOn(console, 'log').mockImplementation(() => {});

describe('CLI Command Handling', () => {
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    setLoggedIn(true);
  });

  afterEach(() => {
    jest.clearAllMocks();
    consoleSpy.mockRestore();
  });

  test('should ask to login if not logged in', () => {
    setLoggedIn(false);
    handleCommand('list');
    expect(console.log).toHaveBeenCalledWith(
      'Please login first using the login command.'
    );
  });

  test('should show help message when "help" is used', () => {
    prompts.mockResolvedValueOnce({ value: 'help' });
    handleInput('help');
    expect(consoleSpy).toHaveBeenCalledWith(
      'Available commands: exit, help, list, create, insert, update, delete'
    );
  });

  test('should call createCommand when "create" is used', async () => {
    createCommand.mockResolvedValueOnce();
    handleCommand('create collection');
    expect(createCommand).toHaveBeenCalledWith('create collection');
  });

  test('should call updateCommand when "update" is used', () => {
    updateCommand.mockResolvedValueOnce();
    handleCommand('update record');
    expect(updateCommand).toHaveBeenCalledWith('update record');
  });

  test('should call deleteCommand when "delete" is used', () => {
    deleteCommand.mockResolvedValueOnce();
    handleCommand('delete record');
    expect(deleteCommand).toHaveBeenCalledWith('delete record');
  });

  test('should call listCommand when "list" is used', () => {
    handleCommand('list');
    expect(consoleSpy).toHaveBeenCalledWith('Listing records...');
  });

  test('should show invalid command message when an invalid command is used', () => {
    handleCommand('random-invalid-command');
    expect(consoleSpy).toHaveBeenCalledWith(
      'Invalid command. Type help for a list of commands.'
    );
  });
});
