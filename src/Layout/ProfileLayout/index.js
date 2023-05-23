import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

import { useState, useEffect } from 'react';
import * as UserService from '../../service/userServices';

import styles from './ProfileLayout.module.scss';

const cx = classNames.bind(styles);

function ProfileLayout({ children }) {
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        function getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        }

        const authToken = localStorage.getItem('authToken') || getCookie('authToken');

        if (!authToken) {
        } else {
            UserService.getCurrentUser({ token: authToken }).then((res) => {
                setUser(res.data);
            });
            setIsLogin(true);
        }
    }, []);

    return (
        <div className={cx('wrapper')}>
            <Header isLogin={isLogin} user={user} isFullWidth={true} className={cx('header_profile')} />
            <div className={cx('container')}>
                <div className={cx('sidebar_container')}>
                    <Sidebar />
                </div>
                <div className={cx('body')}>{children}</div>
            </div>
        </div>
    );
}
ProfileLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
export default ProfileLayout;
