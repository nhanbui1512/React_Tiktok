import React from 'react';

import classNames from 'classnames/bind';
import styles from './loadcontainer.module.scss';

const cx = classNames.bind(styles);

const LoadingSpinner = () => {
    return (
        <div className={cx('loading-spinner-overlay')}>
            <div className={cx('loading-spinner-container')}>
                <div className={cx('loading-spinner')}></div>
            </div>
        </div>
    );
};

export default LoadingSpinner;
