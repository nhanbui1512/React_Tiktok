import classNames from 'classnames/bind';
import styles from './UploadStatus.module.scss';
import Button from '../../../components/Button';
import { useContext } from 'react';
import { UploadContext } from '..';

const cx = classNames.bind(styles);

function UploadStatus() {
  const uploadContext = useContext(UploadContext);

  return (
    <div
      className={cx('wrapper')}
      onClick={(e) => {
        e.preventDefault();
        uploadContext.setUpload(false);
      }}
    >
      <div className={cx('box-status')}>
        <div className={cx('header')}>Video của bạn đang được tải lên TikTok!</div>
        <div className={cx('btn-group')}>
          <Button className={cx('act-btn')} primary>
            Tải video khác lên
          </Button>
          <Button divbox className={cx('act-btn')}>
            Quản lý bài đăng của bạn
          </Button>
        </div>
      </div>
    </div>
  );
}
export default UploadStatus;
