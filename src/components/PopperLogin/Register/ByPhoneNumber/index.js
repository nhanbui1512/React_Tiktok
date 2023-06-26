import classNames from 'classnames/bind';
import styles from '../../PopperLogin.module.scss';

import { useState } from 'react';

const cx = classNames.bind(styles);

function ByPhoneNumber() {
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
            <h1 className={cx('header')}>Đăng Ký</h1>
            <form className={cx('form-login')}>
                <div className={cx('form-header')}>
                    <label>Email </label>
                </div>
                <div className={cx('form-input')}>
                    <input
                        placeholder="Địa chỉ email"
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

                <div className={cx('form-confirm')}>
                    <input type="checkbox" />
                    <p className={cx('confirm-desc')}>
                        Nhận nội dung thịnh hành, bản tin, khuyến mại, đề xuất và thông tin cập nhật tài khoản được gửi
                        đến email của bạn
                    </p>
                </div>

                <button
                    className={checkFill() === true ? cx(['submit-btn', 'primary']) : cx('submit-btn')}
                    onClick={(e) => {
                        e.preventDefault();
                    }}
                >
                    <span>Đăng Ký</span>
                </button>
            </form>
        </div>
    );
}

export default ByPhoneNumber;
