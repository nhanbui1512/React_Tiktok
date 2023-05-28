import React from 'react';
import classNames from 'classnames/bind';
import styles from './loadcontainer.module.scss';

const cx = classNames.bind(styles);

const LoadingSpinner = () => {
    return (
        <div className={cx('loader')}>
            <div className={cx('bar1')}></div>
            <div className={cx('bar2')}></div>
            <div className={cx('bar3')}></div>
            <div className={cx('bar4')}></div>
            <div className={cx('bar5')}></div>
            <div className={cx('bar6')}></div>
            <div className={cx('bar7')}></div>
            <div className={cx('bar8')}></div>
            <div className={cx('bar9')}></div>
            <div className={cx('bar10')}></div>
            <div className={cx('bar11')}></div>
            <div className={cx('bar12')}></div>
        </div>
    );
};

export default LoadingSpinner;
