import Head from 'next/head';
import { FormEvent, useState, SyntheticEvent } from 'react';
import styles from 'src/styles/create_account.module.scss';
import Image from 'next/image';
import wealthfront from '../images/wealthfront.svg';

interface Account {
  username: string,
  password: string,
};

interface Event {
  name: string,
  value: string
};

interface Error {
  error: boolean,
  errorMessage: string
};

export default function CreateAccount() {
  const [account, setAccount] = useState<Account>({
    username: '',
    password: ''
  });
  const [error, setError] = useState<Error>({
    error: false,
    errorMessage: ''
  });

  async function handleSubmit(evt: FormEvent) {
    evt.preventDefault();
    const response = await fetch('/api/create_new_account', {
      method: 'POST',
      body: JSON.stringify(account),
    });

    const { result, errors } = await response.json();
    setError({
      error: result,
      errorMessage: errors.error
    });
  };

  function handleAccount(e: SyntheticEvent) {
    const { name, value }: Event = e.target as HTMLInputElement;
    setAccount({...account, [name]: value});
  };

  return (
    <>
      <Head>
        <title>Create Account</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;900&display=swap" rel="stylesheet" />
      </Head>
      <article className={styles.article}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.image}>
            <Image src={wealthfront} />
          </div>
          <h1 className={styles.header}>Create New Account</h1>
          <div className={styles.input_container}>
            <label className={styles.label}>Username</label>
            <input
              className={styles.input}
              type='input'
              name='username'
              onChange={e => handleAccount(e)}
            />
          </div>
          <div className={styles.input_container}>
            <label className={styles.label}>Password</label>
            <input
              className={styles.input}
              type='password'
              name='password'
              onChange={e => handleAccount(e)}
            />
          </div>
          <button className={styles.button}>Create Account</button>
        </form>
      </article>
    </>
  );
}
