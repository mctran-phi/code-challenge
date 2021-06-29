import type { NextApiRequest, NextApiResponse } from 'next';

interface CreateNewAccountParameters {
  username: string;
  password1: string;
  password2: string;
};

interface BooleanResult {
  result: boolean;
  errors?: Record<string, string>;
};

export default async function createNewAccount(req: NextApiRequest, res: NextApiResponse<BooleanResult>) {
  const { username, password1, password2 }: CreateNewAccountParameters = JSON.parse(req.body);

  const response = await fetch('http://localhost:3000/api/password_exposed', {
    method: 'POST',
    body: JSON.stringify({password: password1}),
  });
  const { result } = await response.json();
  if (result) {
    return res.status(200).json({
      result: false,
      errors: {
        error: 'Warning: Password has been exposed!'
      }
    });
  }

  var userLength = /.{10,50}/;
  var validUser = /^([a-zA-z0-9]){10,50}$/;
  var passLength = /.{20,50}/;
  var atLeastOneLetter = /[a-zA-Z]+/;
  var atLeastOneDigit = /\d/;
  var atLeastOneSymbol = /[!@#$%]+/
  var validPass = /^([a-zA-Z0-9!@#$%]){20,50}$/;

  if (!userLength.test(username)) {
    res.status(200).json({
      result: false,
      errors: {
        error: 'Username must be between 10 to 50 characters!'
      }
    });
  } else if (!validUser.test(username)) {
    res.status(200).json({
      result: false,
      errors: {
        error: 'Username must only contain letters or numbers!'
      }
    });
  } else if (password1 !== password2) {
    res.status(200).json({
      result: false,
      errors: {
        error: 'Password does not match!'
      }
    });
  } else if (!passLength.test(password1)) {
    res.status(200).json({
      result: false,
      errors: {
        error: 'Password must be between 20 to 50 characters!'
      }
    });
  } else if (!atLeastOneLetter.test(password1) && !atLeastOneDigit.test(password1) && !atLeastOneSymbol.test(password1)) {
    res.status(200).json({
      result: false,
      errors: {
        error: 'Password must contain at least 1 letter, 1 number, and 1 symbol (!,@,#,$,%)!'
      }
    });
  } else if (!validPass.test(password1)) {
    res.status(200).json({
      result: false,
      errors: {
        error: 'Password must only contain letters, numbers, or symbols (!,@,#,$,%)!'
      }
    });
  } else {
    res.status(200).json({
      result: true,
      errors: {
        error: ''
      }
    });
  }
};
