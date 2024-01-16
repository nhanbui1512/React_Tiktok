import classNames from 'classnames/bind';
import styles from './AdjustVideo.module.scss';
import Button from '../../../components/Button';
import Image from '../../../components/Image';
import { ArrowLeftRight, Scissors } from '../../../components/Icons';
import images from '../../../assests/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { UploadContext } from '..';

const cx = classNames.bind(styles);

function AdjustVideo() {
  const context = useContext(UploadContext);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('edit-card')}>
        <div className={cx('video-info')}>
          <div className={cx('video-index')}>
            <span>1</span>
          </div>
          <div className={cx('video-cover')}>
            <div className={cx('video-loadingBox')}></div>
            <Image src={context.thumb || images.thumbVideo2} className={cx('video-imageCover')}></Image>
          </div>
          <div className={cx('video-infor-wrapper')}>
            <p className={cx('video-name')}>Linh Mai</p>
            <p className={cx('duration')}>
              <span>00:00</span> - <span>00:15</span>
              <span>15s</span>
            </p>
          </div>
        </div>
        <Button className={cx('adjust-btn')} leftIcon={<Scissors />} primary>
          Chỉnh sửa video
        </Button>
      </div>
      <div className={cx('split-card')}>
        <div className={cx('left')}>
          <p>Tách thành nhiều phần để tăng khả năng hiển thị</p>
          <div className={cx('counter')}>
            <span className={cx('count-btn')}>
              <FontAwesomeIcon icon={faMinus} />
            </span>
            <span className={cx('count')}>2</span>
            <span className={cx('count-btn')}>
              <FontAwesomeIcon icon={faPlus} />
            </span>
          </div>
        </div>
        <div>
          <Button className={cx('devide-btn')} divbox leftIcon={<ArrowLeftRight />}>
            Phân chia
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AdjustVideo;
