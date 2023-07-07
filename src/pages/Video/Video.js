import styles from './Video.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Video() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('video-wrapper')}>Video</div>
            <div className={cx('comment-wrapper')}>Comment</div>
        </div>
    );
}
export default Video;
