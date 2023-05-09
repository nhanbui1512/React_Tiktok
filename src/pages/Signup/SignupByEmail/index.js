import classNames from 'classnames/bind';
import styles from './SignupByEmail.module.scss';

import { Link } from 'react-router-dom';
import Button from '../../../components/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function SisnupByEmail() {
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>Đăng ký TikTok</h2>
            <div className={cx('description')}>
                Email
                <Link>Đăng ky bằng số điện thoại</Link>
            </div>
            <div className={cx('form-container')}>
                <div className={cx('input-container')}>
                    <input type="text" placeholder="Địa chỉ email" />
                </div>
                <div className={cx('input-container')}>
                    <input type="password" placeholder="Mật Khẩu" />
                </div>
                <div className={cx('input-container')}>
                    <input type="password" placeholder="Xác Nhận Mật Khẩu" />
                </div>
                <div className={cx('confirm-container')}>
                    <div className={cx('checkbox-wrapper')}>
                        <input type="checkbox"></input>
                    </div>

                    <label className={cx('description')}>
                        Nhận nội dung thịnh hành, bản tin, khuyến mại, đề xuất và thông tin cập nhật tài khoản được gửi
                        đến email của bạn
                    </label>
                </div>
                <Button className={cx('login-btn')} primary>
                    Tiếp
                </Button>
            </div>

            <div className={cx('back-container')}>
                <FontAwesomeIcon icon={faAngleLeft} className={cx('left-icon')} />
                <Link to={'/signup'}>Quay lại</Link>
            </div>
        </div>
    );
}

export default SisnupByEmail;
