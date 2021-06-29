import { expect } from '@jest/globals';
import createNewAccount from 'src/pages/api/create_new_account';
import { mockRequest } from 'test/utils';

describe('/api/create_new_account', () => {
  test('should return true for valid username and password', async () => {
    var account = {
      username: 'testaccount123',
      password1: 'ValidPassword12345!@#$%',
      password2: 'ValidPassword12345!@#$%'
    };

    const { req, res } = mockRequest({
      method: 'POST',
      body: account
    });

    await createNewAccount(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({
      result: true,
      errors: {
        error: ''
      }
    });
  });

  test('should return false for short username', async () => {
    var account = {
      username: 'test',
      password1: 'Passwordpasswordpassword123!@#',
      password2: 'Passwordpasswordpassword123!@#'
    };

    const { req, res } = mockRequest({
      method: 'POST',
      body: account
    });

    await createNewAccount(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({
      result: false,
      errors: {
        error: 'Username must be between 10 to 50 characters!'
      }
    });
  });

  test('should return false for invalid characters in username', async () => {
    var account = {
      username: '. . . .  . .. . .. . . .',
      password1: 'Passwordpasswordpassword123!@#',
      password2: 'Passwordpasswordpassword123!@#'
    }

    const { req, res } = mockRequest({
      method: 'POST',
      body: account
    });

    await createNewAccount(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({
      result: false,
      errors: {
        error: 'Username must only contain letters or numbers!'
      }
    });
  });

  test('should return false for short password', async () => {
    var account = {
      username: 'testaccount123',
      password1: 'NotLongEnough123!@#',
      password2: 'NotLongEnough123!@#'
    }

    const { req, res } = mockRequest({
      method: 'POST',
      body: account
    });

    await createNewAccount(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({
      result: false,
      errors: {
        error: 'Password must be between 20 to 50 characters!'
      }
    });
  });

  test('should return false if password does not contain at least 1 symbol, letter, and number', async () => {
    var account = {
      username: 'testaccount123',
      password1: 'OnlyLettersAndNumbers123456789',
      password2: 'OnlyLettersAndNumbers123456789'
    };

    const { req, res } = mockRequest({
      method: 'POST',
      body: account
    });

    await createNewAccount(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({
      result: false,
      errors: {
        error: 'Password must contain at least 1 letter, 1 number, and 1 symbol (!,@,#,$,%)!'
      }
    });
  });

  test('should return false if password contain chars other than letters, symbols, or numbers', async() => {
    var account = {
      username: 'testaccount123',
      password1: 'LettersNumbers123Symbols!@#$%Commas?,',
      password2: 'LettersNumbers123Symbols!@#$%Commas?,'
    };

    const { req, res } = mockRequest({
      method: 'POST',
      body: account
    });

    await createNewAccount(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({
      result: false,
      errors: {
        error: 'Password must only contain letters, numbers, or symbols (!,@,#,$,%)!'
      }
    });
  });

  test('should return false if password does not match', async () => {
    var account = {
      username: 'testaccount123',
      password1: 'PasswordNumberOne123!@#',
      password2: 'PasswordNumberTwo123!@#',
    };
    const { req, res } = mockRequest({
      method: 'POST',
      body: account
    });

    await createNewAccount(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({
      result: false,
      errors: {
        error: 'Password does not match!'
      }
    });
  });
});
