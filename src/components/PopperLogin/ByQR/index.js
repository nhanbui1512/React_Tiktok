import classNames from 'classnames/bind';
import styles from '../PopperLogin.module.scss';
import { ScanIcon, UserPlus } from '../../Icons';
import images from '../../../assests/images';
import { ThemeContext } from '../../../Context';
import { useContext } from 'react';

const cx = classNames.bind(styles);

function ByQR() {
    const context = useContext(ThemeContext);

    return (
        <div className={cx('content')}>
            <h1 className={cx('header')}>Đăng nhập bằng mã QR </h1>
            <div className={cx('qr-container')}>
                <div className={cx('qr-left')}>
                    <div className={cx('qr-image')}>
                        <img src={images.qrImage} alt=""></img>
                    </div>

                    <div className={cx('step-list')}>
                        <p className={cx('step-item')}>
                            <span>1. Mở ứng dụng TikTok trên thiết bị di động của bạn</span>
                        </p>
                        <p className={cx('step-item')}>
                            <span>2. Trên Hồ sơ, nhấn vào </span> <UserPlus />
                        </p>
                        <p className={cx('step-item')}>
                            3. Nhấn vào <ScanIcon /> rồi quét mã QR để xác nhận thông tin đăng nhập của bạn
                        </p>
                    </div>
                </div>
                <div className={cx('qr-right')}>
                    <img
                        className={cx('qr-login-gif')}
                        src={context.theme === 'light' ? images.guideLoginWithQRLight : images.guideLoginWithQRDark}
                        alt=""
                    ></img>
                </div>
            </div>
        </div>
    );
}

export default ByQR;
