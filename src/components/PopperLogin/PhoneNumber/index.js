import classNames from 'classnames/bind';
import styles from '../PopperLogin.module.scss';
import { useState, useContext } from 'react';
import { ThemeContext } from '../../../Context';
import { login } from '../../../service/loginServices';
import * as Cookie from '../../../service/local/cookie';

const cx = classNames.bind(styles);

function PhoneNumber() {
  const [email, setEmail] = useState('');
  const [passWord, setPassword] = useState('');
  const [loginFail, setLoginFail] = useState(false);
  const context = useContext(ThemeContext);

  const checkFill = () => {
    if (email.trim() !== '' && passWord.trim() !== '') {
      return true;
    }
    return false;
  };

  return (
    <div className={cx('content')}>
      <h1 className={cx('header')}>Đăng nhập </h1>
      <div className={cx('form-login')}>
        <div className={cx('form-header')}>
          <label>Email hoặc TikTok ID</label>
        </div>
        <div className={cx('form-input')}>
          <input
            name="email"
            placeholder="Email hoặc TikTokID"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className={cx('form-input')}>
          <input
            name="password"
            type="password"
            autoComplete="on"
            placeholder="Mật Khẩu"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        {loginFail && <p className={cx('login-fail')}>Tài khoản hoặc mật khẩu không chính xác !</p>}

        <span className={cx('forgot-pass')}>Quên Mật Khẩu ?</span>

        <button
          className={checkFill() === true ? cx(['submit-btn', 'primary']) : cx('submit-btn')}
          onClick={(e) => {
            e.preventDefault();

            login({ email: email, password: passWord })
              .then((res) => {
                if (res.data) {
                  context.setNotiLoginSuccess(true);
                  setTimeout(() => {
                    context.setNotiLoginSuccess(false);
                  }, 2000);
                  setLoginFail(false);
                  Cookie.setToken({ token: res.meta.token });
                  context.setCurrentUser(true);
                  context.setLoginPopper(false);
                  context.setUser(res.data);
                } else {
                  setLoginFail(true);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          <span>Đăng Nhập</span>
        </button>
      </div>
    </div>
  );
}

export default PhoneNumber;
