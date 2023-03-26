import classNames from 'classnames/bind';
import styles from './VideoItem.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Image from '../../../components/Image';
import images from '../../../assests/images';
import { Link } from 'react-router-dom';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function VideoItem() {
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
