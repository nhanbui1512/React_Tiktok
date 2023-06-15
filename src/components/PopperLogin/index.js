import styles from './PopperLogin.module.scss';
import classNames from 'classnames/bind';

import {
    FaceBookColor,
    GoogleColor,
    InstagramColor,
    KakaoTalkColor,
    LINEColor,
    QRCode,
    TwitterColor,
    UserIcon,
} from '../Icons';

import ByQR from './ByQR';
import PhoneNumber from './PhoneNumber';

import { ThemeContext } from '../../Context';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState, useContext } from 'react';

const cx = classNames.bind(styles);

function PopperLogin({ handleClose }) {
    const [unMount, setUnMount] = useState(false);
    const context = useContext(ThemeContext);
    const [inner, setInner] = useState(1);

    const renderInner = () => {
        switch (inner) {
            case 1:
                return (
                    <div className={cx('content')}>
                        <h1 className={cx('header')}>Đăng nhập vào TikTok</h1>
                        <button
                            className={cx('divBoxBtn')}
                            onClick={() => {
                                setInner(2);
                            }}
                        >
                            <span>
                                <QRCode className={cx('icon')}></QRCode>
                            </span>
                            <span className={cx('title')}>Sử dụng mã QR</span>
                        </button>
                        <button
                            className={cx('divBoxBtn')}
                            onClick={() => {
                                setInner(3);
                            }}
                        >
                            <span>
                                <UserIcon className={cx('icon')}></UserIcon>
                            </span>
                            <span className={cx('title')}>Số điện thoại/ Email / TikTok ID</span>
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

            case 2:
                return <ByQR />;
            case 3:
                return <PhoneNumber />;

            default:
                break;
        }
    };

    return (
        <div className={!unMount ? cx('wrapper') : cx(['wrapper', 'unmount', 'unmount-animation'])}>
            <div className={cx(['body', context.theme])}>
                <button
                    className={cx('closeBtn')}
                    onClick={() => {
                        setUnMount(true);

                        setTimeout(() => {
                            handleClose();
                        }, 400);
                    }}
                >
                    <FontAwesomeIcon className={cx('closeIcon')} icon={faXmark}></FontAwesomeIcon>
                </button>

                {inner !== 1 && (
                    <button
                        className={cx('back-btn')}
                        onClick={() => {
                            setInner(1);
                        }}
                    >
                        <FontAwesomeIcon className={cx('back-icon')} icon={faChevronLeft}></FontAwesomeIcon>
                    </button>
                )}
                {renderInner()}

                <footer className={cx('footer')}>
                    Bạn không có tài khoản? <span className={cx('register')}> Đăng ký</span>
                </footer>
            </div>
        </div>
    );
}

export default PopperLogin;
