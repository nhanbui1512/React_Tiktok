import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import LoadingSpinner from '../../components/LoadingSpinner';

import styles from './DefaultLayot.module.scss';
import { useEffect, useState } from 'react';

import * as UserService from '../../service/userServices';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const loading = false;

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
            {loading ? (
                <LoadingSpinner />
            ) : (
                <div>
                    <Header isLogin={isLogin} user={user} />
                    <div className={cx('container')}>
                        <div className={cx('sidebar_container')}>
                            <Sidebar />
                        </div>
                        <div className={cx('content')}>{children}</div>
                    </div>
                </div>
            )}
        </div>
    );
}
DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
export default DefaultLayout;
