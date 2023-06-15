import classNames from 'classnames/bind';
import styles from '../PopperLogin.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

function PhoneNumber() {
    const [email, setEmail] = useState('');
    const [passWord, setPassword] = useState('');

    const checkFill = () => {
        if (email.trim() !== '' && passWord.trim() !== '') {
            return true;
        }
        return false;
    };

    return (
        <div className={cx('content')}>
            <h1 className={cx('header')}>Đăng nhập </h1>
            <form className={cx('form-login')}>
                <div className={cx('form-header')}>
                    <label>Email hoặc TikTok ID</label>
                </div>
                <div className={cx('form-input')}>
                    <input
                        placeholder="Email hoặc TikTokID"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </div>
                <div className={cx('form-input')}>
                    <input
                        placeholder="Mật Khẩu"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </div>

                <span className={cx('forgot-pass')}>Quên Mật Khẩu ?</span>

                <button
                    className={checkFill() === true ? cx(['submit-btn', 'primary']) : cx('submit-btn')}
                    onClick={(e) => {
                        e.preventDefault();
                    }}
                >
                    <span>Đăng Nhập</span>
                </button>
            </form>
        </div>
    );
}

export default PhoneNumber;
