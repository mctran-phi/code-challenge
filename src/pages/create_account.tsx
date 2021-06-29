import Head from 'next/head';
import { FormEvent, useState, SyntheticEvent, CSSProperties } from 'react';
import styles from 'src/styles/create_account.module.scss';
import Image from 'next/image';
import wealthfront from '../images/wealthfront.svg';

interface Account {
  username: string;
  password1: string;
  password2: string;
};

interface Event {
  name: string;
  value: string;
};

interface Error {
  result: boolean;
  errorMessage: string;
};

export default function CreateAccount() {
  const [account, setAccount] = useState<Account>({
    username: '',
    password1: '',
    password2: ''
  });
  const [error, setError] = useState<Error>({
    result: true,
    errorMessage: ''
  });
  const [created, setCreated] = useState(false);
  const [userReq, setUserReq] = useState(false);
  const [passReq, setPassReq] = useState(false);

  async function handleSubmit(evt: FormEvent) {
    evt.preventDefault();
    const response = await fetch('/api/create_new_account', {
      method: 'POST',
      body: JSON.stringify(account),
    });

    const { result, errors } = await response.json();
    setError({
      result: result,
      errorMessage: errors.error
    });
    setCreated(result);
  };

  function handleAccount(e: SyntheticEvent) {
    const { name, value }: Event = e.target as HTMLInputElement;
    setAccount({...account, [name]: value});
  };

  function toggleUserReq() {
    setUserReq(bool => !bool);
  };

  function togglePassReq() {
    setPassReq(bool => !bool);
  };

  var displayUser: CSSProperties = userReq ? {visibility: 'visible'} : {visibility: 'hidden'};
  var displayPass: CSSProperties = passReq ? {visibility: 'visible'} : {visibility: 'hidden'};

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
          {!error.result && <div className={styles.error}>{error.errorMessage}</div>}
          <div className={styles.input_container}>
            <label className={styles.label}>Username</label>
            <input
              className={styles.input}
              type='input'
              name='username'
              onFocus={e => toggleUserReq()}
              onBlur={e => toggleUserReq()}
              onChange={e => handleAccount(e)}
            required/>
          </div>
          <div className={styles.input_container}>
            <label className={styles.label}>Password</label>
            <input
              className={styles.input}
              type='password'
              name='password1'
              onFocus={e => togglePassReq()}
              onBlur={e => togglePassReq()}
              onChange={e => handleAccount(e)}
            required/>
          </div>
          <div className={styles.input_container}>
            <label className={styles.label}>Re-enter Password</label>
            <input
              className={styles.input}
              type='password'
              name='password2'
              onFocus={e => togglePassReq()}
              onBlur={e => togglePassReq()}
              onChange={e => handleAccount(e)}
            required/>
          </div>
          {!created && <button className={styles.button}>Create Account</button>}
          {created && <div className={styles.created}>Your account as been created!</div> }
        </form>
        <div className={styles.requirements}>
          <div style={displayUser} className={styles.username}>
            <ul className={styles.ul}>
              <li className={styles.li}>Length must be between 10 and 50</li>
              <li className={styles.li}>Must contain only numbers and letters</li>
            </ul>
          </div>
          <div style={displayPass} className={styles.password}>
            <ul className={styles.ul}>
              <li className={styles.li}>Length must be between 20 and 50</li>
              <li className={styles.li}>Must contain only numbers, letters, and symbols (!,@,#,$,%)</li>
              <li className={styles.li}>Must contain at least one symbol (!,@,#,$,%), 1 letter, and 1 number</li>
            </ul>
          </div>
        </div>
      </article>
    </>
  );
};
