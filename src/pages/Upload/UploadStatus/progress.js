import classNames from 'classnames/bind';
import styles from './UploadStatus.module.scss';

const cx = classNames.bind(styles);

function Progress() {
  return (
    <div className={cx('progress-wrapper')}>
      <div className={cx('loading')}>
        <div
          style={{
            '--percent': `99%`,
          }}
          className={cx('cicle')}
        ></div>
        <div className={cx('over')}></div>
        <div className={cx('percent')}>99%</div>
      </div>
      <div className={cx('status-title')}>Đang tải lên...</div>
      <div className={cx('description')}>Việc bạn rời trang không gây gián đoạn cho quá trình đăng video</div>
    </div>
  );
}
export default Progress;
