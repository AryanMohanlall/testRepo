const {
  loginCommand,
  createCommand,
  insertCommand,
  readCommand,
  deleteCommand,
  updateCommand,
} = require('./apiGetters');

const axios = require('axios');

jest.mock('axios');
jest.spyOn(console, 'log').mockImplementation(() => {});

describe('Create Command', () => {
  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log');
    jest.clearAllMocks();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  test('successful create command', async () => {
    axios.post.mockResolvedValue({
      status: 200,
      data: { DBname: 'testDB' },
    });

    await createCommand('CREATE testDB');

    expect(console.log).toHaveBeenCalledWith(
      'Collection created successfully in testDB!'
    );
  });

  test('invalid query create command', async () => {
    axios.post.mockResolvedValue({
      status: 400,
    });

    await createCommand('CREATE testDB');

    expect(console.log).toHaveBeenCalledWith('Invalid query!');
  });

  test('server error create command', async () => {
    axios.post.mockResolvedValue({
      status: 500,
    });

    await createCommand('CREATE testDB');

    expect(console.log).toHaveBeenCalledWith(
      'An error occurred on the server!'
    );
  });

  test('error create command', async () => {
    axios.post.mockResolvedValue({
      status: 404,
    });

    await createCommand('CREATE testDB');

    expect(console.log).toHaveBeenCalledWith('An error occurred!');
  });
});

describe('Insert Command', () => {
  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log');
    jest.clearAllMocks();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  test('successful insert command', async () => {
    axios.post.mockResolvedValue({
      status: 200,
      data: { values: [1, 2, 3] },
    });

    await insertCommand('INSERT 1, 2, 3');

    expect(console.log).toHaveBeenCalledWith(
      'Inserted 3 records successfully!'
    );
  });

  test('invalid query insert command', async () => {
    axios.post.mockResolvedValue({
      status: 400,
    });

    await insertCommand('INSERT 1, 2, 3');

    expect(console.log).toHaveBeenCalledWith('Invalid query!');
  });

  test('server error insert command', async () => {
    axios.post.mockResolvedValue({
      status: 500,
    });

    await insertCommand('INSERT 1, 2, 3');

    expect(console.log).toHaveBeenCalledWith(
      'An error occurred on the server!'
    );
  });

  test('error insert command', async () => {
    axios.post.mockResolvedValue({
      status: 404,
    });

    await insertCommand('INSERT 1, 2, 3');

    expect(console.log).toHaveBeenCalledWith('An error occurred!');
  });
});

describe('Read Command', () => {
  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log');
    jest.clearAllMocks();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  test('successful read command', async () => {
    axios.post.mockResolvedValue({
      status: 200,
      data: { values: [1, 2, 3] },
    });

    await readCommand('READ testDB');

    expect(console.log).toHaveBeenCalledWith({ values: [1, 2, 3] });
  });

  test('invalid query read command', async () => {
    axios.post.mockResolvedValue({
      status: 400,
    });

    await readCommand('READ testDB');

    expect(console.log).toHaveBeenCalledWith('Invalid query!');
  });

  test('server error read command', async () => {
    axios.post.mockResolvedValue({
      status: 500,
    });

    await readCommand('READ testDB');

    expect(console.log).toHaveBeenCalledWith(
      'An error occurred on the server!'
    );
  });

  test('error read command', async () => {
    axios.post.mockResolvedValue({
      status: 404,
    });

    await readCommand('READ testDB');

    expect(console.log).toHaveBeenCalledWith('An error occurred!');
  });
});

describe('Delete Command', () => {
  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log');
    jest.clearAllMocks();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  test('successful delete command', async () => {
    axios.post.mockResolvedValue({
      status: 200,
      data: { deletedCount: 3 },
    });

    await deleteCommand('DELETE testDB');

    expect(console.log).toHaveBeenCalledWith('Deleted 3 records successfully!');
  });

  test('invalid query delete command', async () => {
    axios.post.mockResolvedValue({
      status: 400,
    });

    await deleteCommand('DELETE testDB');

    expect(console.log).toHaveBeenCalledWith('Invalid query!');
  });

  test('server error delete command', async () => {
    axios.post.mockResolvedValue({
      status: 500,
    });

    await deleteCommand('DELETE testDB');

    expect(console.log).toHaveBeenCalledWith(
      'An error occurred on the server!'
    );
  });

  test('error delete command', async () => {
    axios.post.mockResolvedValue({
      status: 404,
    });

    await deleteCommand('DELETE testDB');

    expect(console.log).toHaveBeenCalledWith('An error occurred!');
  });
});

describe('Update Command', () => {
  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log');
    jest.clearAllMocks();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  test('successful update command', async () => {
    axios.post.mockResolvedValue({
      status: 200,
      data: { modifiedCount: 3 },
    });

    await updateCommand('UPDATE testDB');

    expect(console.log).toHaveBeenCalledWith('Updated 3 records successfully!');
  });

  test('invalid query update command', async () => {
    axios.post.mockResolvedValue({
      status: 400,
    });

    await updateCommand('UPDATE testDB');

    expect(console.log).toHaveBeenCalledWith('Invalid query!');
  });

  test('server error update command', async () => {
    axios.post.mockResolvedValue({
      status: 500,
    });

    await updateCommand('UPDATE testDB');

    expect(console.log).toHaveBeenCalledWith(
      'An error occurred on the server!'
    );
  });

  test('error update command', async () => {
    axios.post.mockResolvedValue({
      status: 404,
    });

    await updateCommand('UPDATE testDB');

    expect(console.log).toHaveBeenCalledWith('An error occurred!');
  });
});
