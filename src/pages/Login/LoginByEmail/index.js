import classNames from 'classnames/bind';
import styles from './loginByEmail.module.scss';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function LoginByEmail() {
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>Đăng Nhập</h2>
            <div className={cx('description')}>
                Email hoặc TikTok ID
                <Link>Đăng nhập bằng số điện thoại</Link>
            </div>
            <form className={cx('form-container')}>
                <div className={cx('input-container')}>
                    <input type="text" placeholder="Email hoặc Tiktok ID" />
                </div>
                <div className={cx('input-container')}>
                    <input type="password" placeholder="Mật Khẩu" />
                </div>
                <Link className={cx('forget')}>Quên Mật Khẩu</Link>
                <Button className={cx('login-btn')} primary>
                    Đăng Nhập
                </Button>
            </form>

            <div className={cx('back-container')}>
                <FontAwesomeIcon icon={faAngleLeft} className={cx('left-icon')} />
                <Link to={'/login'}>Quay lại</Link>
            </div>
        </div>
    );
}

export default LoginByEmail;
