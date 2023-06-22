import classNames from 'classnames/bind';
import styles from '../PopperLogin.module.scss';

import {
    FaceBookColor,
    GoogleColor,
    InstagramColor,
    KakaoTalkColor,
    LINEColor,
    TwitterColor,
    UserIcon,
} from '../../Icons';

const cx = classNames.bind(styles);

function Register(setInner) {
    return (
        <div className={cx('content')}>
            <h1 className={cx('header')}>Đăng Ký TikTok</h1>

            <button
                className={cx('divBoxBtn')}
                onClick={() => {
                    setInner(3);
                }}
            >
                <span>
                    <UserIcon className={cx('icon')}></UserIcon>
                </span>
                <span className={cx('title')}>Sử dụng số điện thoại hoặc Email</span>
            </button>

            <button className={cx(['divBoxBtn', 'disable'])}>
                <span>
                    <FaceBookColor className={cx('icon')}></FaceBookColor>
                </span>
                <span className={cx('title')}>Tiếp tục với Facebook</span>
            </button>
            <button className={cx(['divBoxBtn', 'disable'])}>
                <span>
                    <GoogleColor className={cx('icon')}></GoogleColor>
                </span>
                <span className={cx('title')}>Tiếp tục với Google</span>
            </button>

            <button className={cx(['divBoxBtn', 'disable'])}>
                <span>
                    <TwitterColor className={cx('icon')}></TwitterColor>
                </span>
                <span className={cx('title')}>Tiếp tục với Twitter</span>
            </button>

            <button className={cx(['divBoxBtn', 'disable'])}>
                <span>
                    <LINEColor className={cx('icon')}></LINEColor>
                </span>
                <span className={cx('title')}>Tiếp tục với Twitter</span>
            </button>
            <button className={cx(['divBoxBtn', 'disable'])}>
                <span>
                    <KakaoTalkColor className={cx('icon')}></KakaoTalkColor>
                </span>
                <span className={cx('title')}>Tiếp tục với KakaoTalk</span>
            </button>

            <button disabled className={cx(['divBoxBtn', 'disable'])}>
                <span>
                    <InstagramColor className={cx('icon')}></InstagramColor>
                </span>
                <span className={cx('title')}>Tiếp tục với Twitter</span>
            </button>
        </div>
    );
}

export default Register;
