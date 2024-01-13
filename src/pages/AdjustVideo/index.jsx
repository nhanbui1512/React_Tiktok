import classNames from 'classnames/bind';
import styles from './AdjustVideo.module.scss';
import images from '../../assests/images';
import { useRef, useState } from 'react';
import videos from '../../assests/videos';
const cx = classNames.bind(styles);

function AdjustVideo() {
  const [slidePosition, setSlidePosition] = useState(0);
  const videoRef = useRef();
  return (
    <div className={cx('wrapper')}>
      <div className={cx('slider-container')}>
        <div className={cx('header')}>
          <p>Ảnh bìa</p>
        </div>
        <div className={cx('slider')}>
          <div className={cx('list-image')}>
            <div
              style={{
                backgroundImage: `url(${images.thumbVideo2})`,
              }}
              className={cx('image-preview')}
            ></div>
            <div
              style={{
                backgroundImage: `url(${images.thumbVideo2})`,
              }}
              className={cx('image-preview')}
            ></div>
            <div
              style={{
                backgroundImage: `url(${images.thumbVideo2})`,
              }}
              className={cx('image-preview')}
            ></div>
            <div
              style={{
                backgroundImage: `url(${images.thumbVideo2})`,
              }}
              className={cx('image-preview')}
            ></div>
            <div
              style={{
                backgroundImage: `url(${images.thumbVideo2})`,
              }}
              className={cx('image-preview')}
            ></div>
            <div
              style={{
                backgroundImage: `url(${images.thumbVideo2})`,
              }}
              className={cx('image-preview')}
            ></div>
            <div
              style={{
                backgroundImage: `url(${images.thumbVideo2})`,
              }}
              className={cx('image-preview')}
            ></div>
            <div
              style={{
                backgroundImage: `url(${images.thumbVideo2})`,
              }}
              className={cx('image-preview')}
            ></div>
          </div>
          <div
            style={{
              '--slide-data': `${slidePosition}%`,
            }}
            className={cx('video-preview-wrapper')}
          >
            <video ref={videoRef} src={videos.linhMai} />
          </div>
          <input
            onInput={(e) => {
              const percent = e.target.value;
              const targetTime = (percent * videoRef.current.duration) / 100;
              videoRef.current.currentTime = targetTime;

              if (percent < 86) {
                setSlidePosition(percent);
              } else {
                setSlidePosition(85);
              }
            }}
            type="range"
            className={cx('ranger')}
          />
        </div>
      </div>
    </div>
  );
}
export default AdjustVideo;
