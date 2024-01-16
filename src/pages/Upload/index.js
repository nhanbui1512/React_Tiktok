import classNames from 'classnames/bind';
import styles from './Upload.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUpload } from '@fortawesome/free-solid-svg-icons';

import Button from '../../components/Button';
import AdjustVideo from './AdjustVideo';
import SetupVideo from './SetupVideo';
import { useEffect, useRef, useState } from 'react';
import { createContext } from 'react';
import UploadStatus from './UploadStatus';

export const UploadContext = createContext();

const cx = classNames.bind(styles);

function Upload() {
  const [file, setFile] = useState();
  const [thumb, setThumb] = useState('');
  const fileRef = useRef();
  const [upload, setUpload] = useState({
    isOn: false,
    status: 'loading',
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <UploadContext.Provider value={{ file, setFile, thumb, setThumb, setUpload }}>
      <div
        className={cx('wrapper', {
          file: file,
        })}
      >
        <div className={cx('upload-card')}>
          <FontAwesomeIcon icon={faCloudUpload} className={cx('icon')} />
          <div className={cx('text-main')}>
            <span>Chọn video để tải lên</span>
          </div>

          <div className={cx('text')}>
            <span>Hoặc kéo thả tập tin</span>
          </div>

          <div className={cx('text', 'mg-4-0-24')}>
            <span>Có thể tách video dài thành nhiều phần để tăng khả năng hiển thị</span>
          </div>

          <div className={cx('text-video-info')}>
            <div className={cx('text', 'mb-6')}>
              <span>MP4 hoặc WebM</span>
            </div>
            <div className={cx('text', 'mb-6')}>
              <span>Độ phân giải 720x1280 trở lên</span>
            </div>
            <div className={cx('text', 'mb-6')}>
              <span>Tối đa 30 phút</span>
            </div>
            <div className={cx('text')}>
              <span>Nhỏ hơn 2 GB</span>
            </div>
          </div>

          <div className={cx('choose-container')}>
            <Button
              onClick={() => {
                fileRef.current.click();
              }}
              className={cx('choose-btn')}
              primary
            >
              Chọn tập tin
            </Button>

            <input
              ref={fileRef}
              type="file"
              accept="video/mp4,video/x-m4v,video/*"
              style={{
                display: 'none',
              }}
              onChange={(e) => {
                const choosedFile = e.target.files[0];
                if (choosedFile) {
                  choosedFile.preview = URL.createObjectURL(choosedFile);
                  setFile(choosedFile);
                }
              }}
            />
          </div>
        </div>
      </div>
      {file && (
        <>
          <AdjustVideo />
          <SetupVideo />
        </>
      )}

      {upload.isOn && <UploadStatus status={upload.status} />}
    </UploadContext.Provider>
  );
}
export default Upload;
