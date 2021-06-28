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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
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
              onChange={e => handleUsername(e.target.value)}
            />
          </div>
          <div className={styles.input_container}>
            <label className={styles.label}>Password</label>
            <input
              className={styles.input}
              type='password'
              onChange={e => handleFirstPassword(e.target.value)}
            />
          </div>
          <div className={styles.input_container}>
            <label className={styles.label}>Re-enter password</label>
            <input
              className={styles.input}
              type='password'
              onChange={e => handleSecondPassword(e.target.value)}
            />
          </div>
          <button className={styles.button}>Create Account</button>
        </form>
      </article>
    </>
  );
}
