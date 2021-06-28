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
  const { username, password}: CreateNewAccountParameters = req.body;

  const response = await fetch('/api/create_new_account', {
    method: 'POST',
    body: JSON.stringify(password),
  });
  const { result } = await response.json();

  if (!result) {
    res.status(200).json({
      result: false,
      errors: {error: 'exposed'}
    });
  }

  var userLength = /.{10,50}/;
  var validUser = /^([a-zA-z0-9]){10,50}$/;
  var passLength = /.{20,50}/;
  var passAtLeastOne = /([a-zA-Z])+([0-9])+([!@#$%])+/
  var validPass = /^([a-zA-Z0-9!@#$%]){20,50}$/;
  if (userLength.test(req.body.username)) {

  }
  res.status(200).json({ result: true });
}
