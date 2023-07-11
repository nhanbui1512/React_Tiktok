import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Video.module.scss';
import classNames from 'classnames/bind';
import {
    faChevronDown,
    faChevronUp,
    faPlay,
    faVolumeHigh,
    faVolumeXmark,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { faFlag } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import Comment from './Comment';
import Volume from '../../components/Post/volume';
import HeadlessTippy from '@tippyjs/react/headless';

import { useRef, useState } from 'react';

const cx = classNames.bind(styles);

function Video() {
    const videoRef = useRef(null);
    const [isPlay, setPlay] = useState(false);
    const [isMuted, setIsmuted] = useState(false);
    const [totalTime] = useState('00:15');
    const [timePlay, setTimePlay] = useState('00:00');
    const [progressData, setProgressData] = useState('0%');

    const handlePlay = () => {
        if (videoRef.current.readyState === 4) {
            isPlay ? videoRef.current.pause() : videoRef.current.play();
            setPlay(!isPlay);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('video-wrapper')}>
                <div className={cx('video-layer')}>
                    <div className={cx('videoPlayerWrapper')}>
                        <div
                            style={{
                                backgroundImage: `url('https://files.fullstack.edu.vn/f8-tiktok/videos/1938-641efdc1e6067.jpg')`,
                            }}
                            className={cx('video-background')}
                        ></div>
                        <video
                            ref={videoRef}
                            onClick={() => {
                                handlePlay();
                            }}
                            onTimeUpdate={(e) => {
                                let currentTime = e.target.currentTime;
                                let duration = videoRef.current.duration;
                                let progressPercent = (currentTime / duration) * 100;

                                let realTime = new Date(currentTime * 1000);
                                let secondStr = String(realTime.getSeconds()).padStart(2, '0');

                                setTimePlay(`00:${secondStr}`);

                                setProgressData(`${progressPercent}%`);
                            }}
                            className={cx('videoPlayer')}
                            src="https://files.fullstack.edu.vn/f8-tiktok/videos/1938-641efdc1421f2.mp4"
                            loop
                        ></video>
                        <div className={cx('playerControlWrapper')}>
                            <div className={cx('video-process')} style={{ '--progress-data': progressData }}>
                                <div className={cx('loaded-bar')}>
                                    <div className={cx('progress-dot')}></div>
                                </div>
                                <input
                                    onChange={(e) => {
                                        let value = e.target.value;
                                        let duration = videoRef.current.duration;
                                        let setTimeValue = (duration * value) / 100;
                                        videoRef.current.currentTime = setTimeValue;
                                        console.log(value);
                                        setProgressData(`${value}%`);
                                    }}
                                    className={cx('video-input')}
                                    type="range"
                                    min="0"
                                    max="100"
                                    step="1"
                                />
                            </div>
                            <div className={cx('video-timer')}>
                                <span>{timePlay}</span>/<span>{totalTime}</span>
                            </div>
                        </div>

                        {isPlay || (
                            <button
                                onClick={() => {
                                    handlePlay();
                                }}
                                className={cx('pause-btn')}
                            >
                                <FontAwesomeIcon className={cx('play-icon')} icon={faPlay} />
                            </button>
                        )}

                        <button className={cx(['videoPlayerBtn', 'down-btn'])}>
                            <FontAwesomeIcon className={cx('moving-icon')} icon={faChevronDown} />
                        </button>
                        <button className={cx(['videoPlayerBtn', 'up-btn'])}>
                            {' '}
                            <FontAwesomeIcon className={cx('moving-icon')} icon={faChevronUp} />
                        </button>

                        <HeadlessTippy
                            offset={[0, 10]}
                            interactive
                            delay={[0, 700]}
                            placement="top"
                            render={(attrs) => <Volume videoRef={videoRef} className={cx('volume-wrapper')} />}
                        >
                            <button
                                onClick={() => {
                                    setIsmuted(!isMuted);
                                    videoRef.current.muted = !isMuted;
                                }}
                                className={cx(['videoPlayerBtn', 'volume-btn'])}
                            >
                                <FontAwesomeIcon
                                    className={cx('volume-icon')}
                                    icon={isMuted ? faVolumeXmark : faVolumeHigh}
                                />
                            </button>
                        </HeadlessTippy>
                    </div>
                </div>

                <Link to={'/'} className={cx(['close-btn', 'videoPlayerBtn'])}>
                    <FontAwesomeIcon className={cx('close-icon')} icon={faXmark} />
                </Link>

                <button className={cx(['videoPlayerBtn', 'report-btn'])}>
                    <FontAwesomeIcon className={cx('flag-icon')} icon={faFlag} /> Báo cáo
                </button>
            </div>
            <div className={cx('comment-wrapper')}>
                <Comment />
            </div>
        </div>
    );
}
export default Video;
