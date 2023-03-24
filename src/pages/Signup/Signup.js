import classNames from 'classnames/bind';
import styles from './Signup.module.scss';

import Header from '../Login/Header';
import Footer from '../Login/Footer';

import { UserIcon } from '../../components/Icons';
import DivBox from '../../components/DivBox';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

function SignUp() {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('body')}>
                <div className={cx('body_wrapper')}>
                    <div>
                        <h2 className={cx('login_title')}>Sign up for TikTok</h2>
                        <div className={cx('login_description')}>
                            Create a profile, follow other accounts, make your own videos, and more.
                        </div>
                        <Link className={cx('chanel_item')}>
                            <DivBox icon={<UserIcon />}>Use Email</DivBox>
                        </Link>
                    </div>
                </div>
            </div>
            <Footer isLogin={false} />
        </div>
    );
}

export default SignUp;
