import classNames from 'classnames/bind';
import styles from './loginByEmail.module.scss';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button';

import { useRef, useContext } from 'react';
import { ThemeContext } from '../../../Context';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

import * as LoginService from '../../../service/loginServices';
import * as Cookie from '../../../service/local/cookie';

const cx = classNames.bind(styles);

function LoginByEmail() {
    const navigate = useNavigate();

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const context = useContext(ThemeContext);

    const handleLogin = () => {
        var emailValue = emailRef.current.value;
        var passwordValue = passwordRef.current.value;

        LoginService.login({ email: emailValue, password: passwordValue })
            .then((res) => {
                if (res.meta) {
                    console.log(res);
                    Cookie.setToken({ token: res.meta.token });
                    navigate('/');
                    context.setNotiLoginSuccess(true);
                    setTimeout(() => {
                        context.setNotiLoginSuccess(false);
                    }, 2000);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>Đăng Nhập</h2>
            <div className={cx('description')}>
                Email hoặc TikTok ID
                <Link>Đăng nhập bằng số điện thoại</Link>
            </div>
            <div className={cx('form-container')}>
                <div className={cx('input-container')}>
                    <input ref={emailRef} type="text" placeholder="Email hoặc Tiktok ID" />
                </div>
                <div className={cx('input-container')}>
                    <input ref={passwordRef} type="password" placeholder="Mật Khẩu" />
                </div>
                <Link className={cx('forget')}>Quên Mật Khẩu</Link>
                <Button onClick={handleLogin} className={cx('login-btn')} primary>
                    Đăng Nhập
                </Button>
            </div>

            <div className={cx('back-container')}>
                <FontAwesomeIcon icon={faAngleLeft} className={cx('left-icon')} />
                <Link to={'/login'}>Quay lại</Link>
            </div>
        </div>
    );
}

export default LoginByEmail;
