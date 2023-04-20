import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import LoadingSpinner from '../../components/LoadingSpinner';

import styles from './DefaultLayot.module.scss';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const loading = false;
    var viewport_width = document.documentElement.clientWidth;

    const [isLogin, setIsLogin] = useState(false);

    // setTimeout(() => {
    //     setLoading(false);
    // }, 2000);

    useEffect(() => {
        function getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        }

        const authToken = localStorage.getItem('authToken') || getCookie('authToken');

        if (!authToken) {
        } else {
            setIsLogin(true);
        }
    }, []);

    if (viewport_width < 500) {
        return <h1>Layout Mobile</h1>;
    } else {
        return (
            <div className={cx('wrapper')}>
                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <div>
                        <Header isLogin={isLogin} />
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
}
DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
export default DefaultLayout;
