import classNames from 'classnames/bind';
import styles from './OwnVideos.module.scss';

import { useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

import VideoItem from '../VideoItem';

const cx = classNames.bind(styles);

function OwnVideos() {
    const bottomLineRef = useRef();

    const handleHover = () => {
        bottomLineRef.current.style = 'transform: translateX(230px);';
    };

    const handleMouseLeave = () => {
        bottomLineRef.current.style = 'transform: translateX(0);';
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <p className={cx('video-tab')}>
                    <span>Video</span>
                </p>
                <p onMouseLeave={handleMouseLeave} onMouseOver={handleHover} className={cx('video-tab', 'liked-tab')}>
                    <FontAwesomeIcon className={cx('icon-lock')} icon={faLock} />
                    <span>Đã Thích</span>
                </p>
                <div ref={bottomLineRef} className={cx('bottom-line')}></div>
            </div>
            <div>
                <div className={cx('body-container')}>
                    <VideoItem />
                    <VideoItem />
                    <VideoItem />
                    <VideoItem />
                    <VideoItem />
                    <VideoItem />
                </div>
            </div>
        </div>
    );
}

export default OwnVideos;
