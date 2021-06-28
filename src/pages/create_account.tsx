import Head from 'next/head';
import { FormEvent, useState } from 'react';
import styles from 'src/styles/create_account.module.scss';
import Image from 'next/image';
import wealthfront from '../images/wealthfront.svg';

export default function CreateAccount() {
  const [username, setUsername] = useState('');
  const [firstPassword, setFirstPassword] = useState('');
  const [SecondPassword, setSecondPassword] = useState('');

  async function handleSubmit(evt: FormEvent) {
    evt.preventDefault();
    const response = await fetch('/api/create_new_account', {
      method: 'POST',
      body: JSON.stringify({}),
    });

    console.log(await response.json());
  };

  var handleUsername = user => {
    setUsername(user);
  };

  var handleFirstPassword = pass => {
    setFirstPassword(pass);
  };

  var handleSecondPassword = pass => {
    setSecondPassword(pass);
  };

  return (
    <>
      <Head>
        <title>Create Account</title>
      </Head>
      <article className={styles.article}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Image src={wealthfront} />
          <h2>Create New Account</h2>
          <div>
            <label>Username</label>
            <input type='input' onChange={e => handleUsername(e.target.value)}></input>
          </div>
          <div>
            <label>Password</label>
            <input type='password' onChange={e => handleFirstPassword(e.target.value)}></input>
          </div>
          <div>
            <label>Re-enter password</label>
            <input type='password' onChange={e => handleSecondPassword(e.target.value)}></input>
          </div>
          <button>Create Account</button>
        </form>
      </article>
    </>
  );
}
