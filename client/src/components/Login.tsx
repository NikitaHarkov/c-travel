import React, { FC, useState } from 'react';
import styled from 'styled-components';
import wave from '../assets/wave.png';
import loginPicture from '../assets/login-picture.svg';
import logo from '../assets/logo.png';

const Login: FC = () => {
  //TODO if verified jwt token => redirect to /contracts
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const { username, password } = formData;

  const changeHadler = (e: React.FormEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
  };
  const submitHandler = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  const focusHandler = (e: React.FormEvent) => {
    const parent = e.currentTarget.parentNode?.parentNode as HTMLElement;
    parent?.classList.add('focus');
  };

  const blurHandler = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.value === '') {
      const parent = e.currentTarget.parentNode?.parentNode as HTMLElement;
      parent?.classList.remove('focus');
    }
  };

  return (
    <Wrapper>
      <img src={wave} alt='background' className='wave' />
      <section>
        <aside>
          <img src={loginPicture} alt='login' />
        </aside>
        <article>
          <form>
            <img src={logo} alt='logo' className='logo' />
            <h2>Sign in</h2>
            <div className='input-form username'>
              <div className='icon'>
                <i className='fas fa-user'></i>
              </div>
              <div className='input-section'>
                <h5>Username</h5>
                <input
                  type='text'
                  name='username'
                  value={username}
                  onChange={changeHadler}
                  onFocus={focusHandler}
                  onBlur={blurHandler}
                />
              </div>
            </div>
            <div className='input-form password'>
              <div className='icon'>
                <i className='fas fa-lock'></i>
              </div>
              <div className='input-section'>
                <h5>Password</h5>
                <input
                  type='password'
                  name='password'
                  value={password}
                  onChange={changeHadler}
                  onFocus={focusHandler}
                  onBlur={blurHandler}
                />
              </div>
            </div>
            <button type='button' onClick={submitHandler}>
              Login
            </button>
          </form>
        </article>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .wave {
    position: fixed;
    height: 100%;
    left: 0;
    bottom: 0;
    z-index: -1;
  }

  section {
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 7rem;
    padding: 0 2rem;
  }

  aside {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  aside img {
    width: 600px;
  }

  article {
    display: flex;
    align-items: center;
    text-align: center;
  }

  form {
    width: 360px;
  }

  form .logo {
    width: 250px;
  }

  form h2 {
    font-size: 2.9rem;
    text-transform: uppercase;
    margin: 15px 0;
    color: #333;
  }

  .input-form {
    position: relative;
    display: grid;
    grid-template-columns: 7% 93%;
    margin: 25px 0;
    padding: 5px 0;
    border-bottom: 2px solid #d9d9d9;
  }

  /* underline input*/
  .input-form::after,
  .input-form::before {
    content: '';
    position: absolute;
    bottom: -2px;
    width: 0;
    height: 2px;
    background-color: #eed04a;
  }

  .input-form::after {
    right: 50%;
  }

  .input-form::before {
    left: 50%;
  }

  .input-form.username {
    margin-top: 0;
  }

  .input-form.password {
    margin-bottom: 4px 0;
  }

  .icon {
    color: #d9d9d9;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .icon i {
    transition: 0.3s;
  }

  .input-form > div {
    position: relative;
    height: 45px;
  }

  .input-form > div > h5 {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #999;
    font-size: 18px;
    transition: 0.3s;
  }

  /* Input focus */
  .input-form.focus::after,
  .input-form.focus::before {
    width: 50%;
  }

  .input-form.focus .icon i {
    color: #eed04a;
  }

  .input-form.focus div > h5 {
    top: -5px;
    font-size: 15px;
  }

  input {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border: none;
    outline: none;
    background: none;
    padding: 0.5rem 0.7rem;
    font-size: 1.2rem;
    color: #555;
    font-family: 'Roboto', sans-serif;
  }

  button {
    display: block;
    width: 100%;
    height: 50px;
    border-radius: 25px;
    margin: 1rem 0;
    font-size: 1.2rem;
    outline: none;
    border: none;
    background-image: linear-gradient(to right, #eed04a, #fbf4d6, #eed04a);
    cursor: pointer;
    color: #1b1818;
    text-transform: uppercase;
    font-family: 'Roboto', sans-serif;
    background-size: 200%;
    transition: 0.5s;
  }

  button:hover {
    background-position: right;
  }

  @media screen and (max-width: 1050px) {
    section {
      grid-gap: 5rem;
    }
  }

  @media screen and (max-width: 1000px) {
    form {
      width: 290px;
    }

    article > h2 {
      font-size: 2.4rem;
      margin: 8px 0;
    }

    aside > img {
      width: 400px;
    }
  }

  @media screen and (max-width: 900px) {
    section {
      grid-template-columns: 1fr;
    }

    aside > img {
      display: none;
    }

    .wave {
      display: none;
    }

    article {
      justify-content: center;
    }
  }
`;

export default Login;
