import classNames from 'classnames/bind';
import styles from './UploadStatus.module.scss';
import Button from '../../../components/Button';
import { useContext } from 'react';
import { UploadContext } from '..';
import Progress from './progress';
import { ThemeContext } from '../../../Context';

const cx = classNames.bind(styles);

function UploadStatus({ status }) {
  const uploadContext = useContext(UploadContext);
  const context = useContext(ThemeContext);
  return (
    <div
      className={cx('wrapper')}
      onClick={(e) => {
        e.preventDefault();
        uploadContext.setUpload(false);
      }}
    >
      <div className={cx('box-status')}>
        {status === 'done' && (
          <div className="col">
            <div className={cx('header')}>Video của bạn đang được tải lên TikTok!</div>
            <div className={cx('btn-group')}>
              <Button className={cx('act-btn')} primary>
                Tải video khác lên
              </Button>
              <Button to={`/@${context.user.nickname}`} divbox className={cx('act-btn')}>
                Quản lý bài đăng của bạn
              </Button>
            </div>
          </div>
        )}

        {status === 'loading' && <Progress />}
      </div>
    </div>
  );
}
export default UploadStatus;
