import classNames from 'classnames/bind';
import styles from './Login.module.scss';

import {
    FaceBookColor,
    GoogleColor,
    QRCode,
    UserIcon,
    TwitterColor,
    LINEColor,
    KakaoTalkColor,
    Apple,
    InstagramColor,
} from '../../components/Icons';

import Header from './Header';
import Footer from './Footer';
import DivBox from '../../components/DivBox';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Login() {
    window.scrollTo(0, 0);
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('body')}>
                <div className={cx('body_wrapper')}>
                    <div>
                        <h2 className={cx('login_title')}>Đăng nhập vào TikTok</h2>
                        <div className={cx('login_description')}>
                            Quản lý tài khoản, kiểm tra thông báo, bình luận trên các video, v.v.
                        </div>
                        <Link className={cx('chanel_item')}>
                            <DivBox icon={<QRCode />}>Sử dụng mã QR</DivBox>
                            <DivBox icon={<UserIcon />}>Số điện thoại / Email / TikTok ID</DivBox>
                            <DivBox icon={<FaceBookColor />}>Tiếp tục với Facebook</DivBox>
                            <DivBox icon={<GoogleColor />}>Tiếp tục với Google</DivBox>
                            <DivBox icon={<TwitterColor />}>Tiếp tục với Twitter</DivBox>
                            <DivBox icon={<LINEColor />}>Tiếp tục với LINE</DivBox>
                            <DivBox icon={<KakaoTalkColor />}>Tiếp tục với KakaoTalk</DivBox>
                            <DivBox icon={<Apple />}>Tiếp tục với Apple</DivBox>
                            <DivBox icon={<InstagramColor />}>Tiếp tục với Instagram</DivBox>
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
export default Login;
