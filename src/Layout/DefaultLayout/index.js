import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import LoadContainer from '../../components/LoadContainer';

import styles from './DefaultLayot.module.scss';
import { useState } from 'react';
const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const [loading, setLoading] = useState(true);
    var viewport_width = document.documentElement.clientWidth;

    setTimeout(() => {
        setLoading(false);
    }, 2000);

    if (viewport_width < 500) {
        return <h1>Layout Mobile</h1>;
    } else {
        return (
            <div className={cx('wrapper')}>
                {loading ? (
                    <LoadContainer />
                ) : (
                    <div>
                        <Header />
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
