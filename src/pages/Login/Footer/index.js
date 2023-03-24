import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styes from './Footer.module.scss';

const cx = classNames.bind(styes);

function Footer({ isLogin = true }) {
    return (
        <div className={cx('container')}>
            <div className={cx('box_question')}>
                {isLogin ? <div>Bạn không có tài khoản? </div> : <div>Bạn đã có tài khoản? </div>}
                {isLogin ? (
                    <Link to="/signup" className={cx('link')}>
                        <span>Đăng ký</span>
                    </Link>
                ) : (
                    <Link to="/login" className={cx('link')}>
                        <span>Đăng Nhập</span>
                    </Link>
                )}
            </div>
            <div className={cx('bottom')}>
                <div className={cx('country')}>
                    <p className={cx('country__text')}>Tiếng Việt (Việt Nam)</p>
                </div>
                <div className={cx('coppy_right')}>© 2023 TikTok</div>
            </div>
        </div>
    );
}

export default Footer;
