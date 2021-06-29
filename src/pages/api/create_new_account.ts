import type { NextApiRequest, NextApiResponse } from 'next';

interface CreateNewAccountParameters {
  username: string;
  password: string;
}

interface BooleanResult {
  result: boolean;
  errors?: Record<string, string>;
}

export default async function createNewAccount(req: NextApiRequest, res: NextApiResponse<BooleanResult>) {
  const { username, password }: CreateNewAccountParameters = JSON.parse(req.body);

  // const response = await fetch('/api/password_exposed', {
  //   method: 'POST',
  //   body: JSON.stringify(password),
  // });
  // const { result } = await response.json();

  // if (!result) {
  //   res.status(200).json({
  //     result: false,
  //     errors: {
  //       error: 'Password has been exposed!'
  //     }
  //   });
  // }

  var userLength = /.{10,50}/;
  var validUser = /^([a-zA-z0-9]){10,50}$/;
  var passLength = /.{20,50}/;
  var passAtLeastOne = /([a-zA-Z])+([0-9])+([!@#$%])+/
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
  } else if (!passLength.test(password)) {
    res.status(200).json({
      result: false,
      errors: {
        error: 'Password must be between 20 to 50 characters!'
      }
    });
  } else if (!passAtLeastOne.test(password)) {
    res.status(200).json({
      result: false,
      errors: {
        error: 'Password must contain at least one letter, one number, and one symbol (!, @, #, $, %)'
      }
    });
  } else if (!validPass.test(password)) {
    res.status(200).json({
      result: false,
      errors: {
        error: 'Password must only contain letters, numbers, or symbols (!, @, #, $, %)'
      }
    });
  } else {
    res.status(200).json({ result: true });
  }
}
