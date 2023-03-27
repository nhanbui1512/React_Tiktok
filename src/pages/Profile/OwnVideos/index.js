import classNames from 'classnames/bind';
import styles from './OwnVideos.module.scss';

import { useRef, useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

import VideoItem from '../VideoItem';

const cx = classNames.bind(styles);

function OwnVideos({ videos }) {
    const [ownVideos, setOwnVideos] = useState([]);

    const bottomLineRef = useRef(null);

    const handleHover = () => {
        bottomLineRef.current.style = 'transform: translateX(230px);';
    };

    const handleMouseLeave = () => {
        bottomLineRef.current.style = 'transform: translateX(0);';
    };

    useEffect(() => {
        setOwnVideos(videos);
    }, [videos]);

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
                    {ownVideos.map((video) => {
                        return <VideoItem data={video} key={video.id}></VideoItem>;
                    })}
                </div>
            </div>
        </div>
    );
}

export default OwnVideos;
