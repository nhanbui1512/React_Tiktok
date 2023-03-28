import classNames from 'classnames/bind';
import styles from './VideoItem.module.scss';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Image from '../../../components/Image';

const cx = classNames.bind(styles);

function VideoItem({ data }) {
    const [isHover, setIsHover] = useState(false);

    const preLoadVideoRef = useRef();
    const containerRef = useRef();

    const handlePreload = () => {
        setIsHover(true);
    };
    const handleMouseLeave = () => {
        setIsHover(false);
    };

    useEffect(() => {
        containerRef.current.addEventListener('mouseover', handlePreload);
        containerRef.current.addEventListener('mouseleave', handleMouseLeave);
        return () => {};
    }, []);

    return (
        <div ref={containerRef} className={cx('wrapper')}>
            <div className={cx('video-container')}>
                <div style={{ paddingTop: '132.653%' }}>
                    <div className={cx('div-wrapper')}>
                        <canvas width="75.38461538461539" height="100"></canvas>
                        <Link>
                            <div className={cx('player-container')}>
                                <div className={cx('div-container')}>
                                    <Image className={cx('thumb-image')} src={data.thumb_url}></Image>
                                    {isHover && (
                                        <div className={cx('preload-container')}>
                                            <div style={{ width: '100%', height: '100%' }} className={cx('preload')}>
                                                <video
                                                    loop
                                                    autoPlay
                                                    muted={true}
                                                    ref={preLoadVideoRef}
                                                    className={cx('preload-video')}
                                                    src={data.file_url}
                                                ></video>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className={cx('card-footer')}>
                                    <FontAwesomeIcon className={cx('play-icon')} icon={faPlay} />
                                    <strong className={cx('views-count')}>{data.views_count}</strong>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
VideoItem.propTypes = {
    data: PropTypes.object.isRequired,
};
export default VideoItem;
