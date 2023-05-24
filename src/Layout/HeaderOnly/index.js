import Header from '../../components/Header';
import classNames from 'classnames/bind';
import styles from './HeaderOnly.module.scss';

import { useState, useEffect } from 'react';
import * as UserService from '../../service/userServices';

const cx = classNames.bind(styles);

function HeaderOnly({ children }) {
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
            <Header isFullWidth isLogin={isLogin} user={user} />
            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

export default HeaderOnly;
