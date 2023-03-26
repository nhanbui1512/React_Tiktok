import classNames from 'classnames/bind';
import styles from './VideoItem.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useRef, useEffect } from 'react';

import Image from '../../../components/Image';
import images from '../../../assests/images';
import videos from '../../../assests/videos';
import { Link } from 'react-router-dom';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function VideoItem() {
    const preLoadVideoRef = useRef();

    useEffect(() => {
        preLoadVideoRef.current.play();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('video-container')}>
                <div style={{ paddingTop: '132.653%' }}>
                    <div className={cx('div-wrapper')}>
                        <canvas width="75.38461538461539" height="100"></canvas>
                        <Link>
                            <div className={cx('player-container')}>
                                <div className={cx('div-container')}>
                                    <Image className={cx('thumb-image')} src={images.thumbVideo}></Image>
                                    <div className={cx('preload-container')}>
                                        <div style={{ width: '100%', height: '100%' }} className={cx('preload')}>
                                            <video
                                                muted={true}
                                                ref={preLoadVideoRef}
                                                loop
                                                className={cx('preload-video')}
                                                src={videos.default}
                                            ></video>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('card-footer')}>
                                    <FontAwesomeIcon className={cx('play-icon')} icon={faPlay} />
                                    <strong className={cx('views-count')}>650.2K</strong>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default VideoItem;
