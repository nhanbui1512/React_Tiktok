import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Video.module.scss';
import classNames from 'classnames/bind';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faFlag } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Video() {
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
                            className={cx('videoPlayer')}
                            src="https://files.fullstack.edu.vn/f8-tiktok/videos/1938-641efdc1421f2.mp4"
                        ></video>
                        <div className={cx('playerControlWrapper')}>
                            <div className={cx('video-process')}>
                                <div className={cx('loaded-bar')}>
                                    <div className={cx('progress-dot')}></div>
                                </div>
                                <input className={cx('video-input')} type="range" min="0" max="100" step="1" />
                            </div>
                            <div className={cx('video-timer')}>
                                <span>00:04</span>/<span>00:26</span>
                            </div>
                        </div>
                    </div>
                </div>

                <Link to={'/'} className={cx(['close-btn', 'videoPlayerBtn'])}>
                    <FontAwesomeIcon className={cx('close-icon')} icon={faXmark} />
                </Link>

                <button className={cx(['videoPlayerBtn', 'report-btn'])}>
                    <FontAwesomeIcon className={cx('flag-icon')} icon={faFlag} /> Báo cáo
                </button>
            </div>
            <div className={cx('comment-wrapper')}>Comment</div>
        </div>
    );
}
export default Video;
