import classNames from 'classnames/bind';
import styles from './PhonePreview.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';
import { CirclePlay, LiveTV, Pause, SearchIcon } from '../Icons';
import { faExpand, faMusic, faVolumeHigh, faVolumeMute } from '@fortawesome/free-solid-svg-icons';

import Image from '../../components/Image';
import images from '../../assests/images';
import videos from '../../assests/videos';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function PhonePreview({ file, setFile }) {
  const [percent, setPercent] = useState(0);
  const [isPlay, setIsPlay] = useState(false);
  const videoRef = useRef();
  const [isMute, setIsMute] = useState(true);
  const fileRef = useRef();

  return (
    <div className={cx('wrapper')}>
      <div className={cx('phone-wrapper')}>
        <div className={cx('island')}>
          <Image src={images.dynamicIsland} />
        </div>
        <div className={cx('preview-header')}>
          <div className={cx('preview-header-wrapper')}>
            <LiveTV />
            <span>Đang Follow</span>
            <span>Dành cho bạn</span>
            <SearchIcon width={18} height={18} />
          </div>
        </div>
        <Image className={cx('frame-img')} src={images.phoneFrame} />
        <div
          className={cx('clickable')}
          onClick={(e) => {
            e.preventDefault();
            if (!videoRef.current.paused) {
              videoRef.current.pause();
            } else {
              videoRef.current.play();
              setIsPlay(true);
            }
          }}
        ></div>
        <div className={cx('video-wrapper')}>
          <video
            muted={isMute}
            onTimeUpdate={(e) => {
              const percent = (videoRef.current.currentTime / videoRef.current.duration) * 100;
              setPercent(percent);
            }}
            onPause={() => {
              setIsPlay(false);
            }}
            ref={videoRef}
            className={cx('video-preview')}
            src={file.preview || videos.linhMai}
          ></video>
        </div>
        <div className={cx('footer')}>
          <Image className={cx('nav-img')} src={images.navFooter} />
        </div>
        <div className={cx('infor-wrapper')}>
          <div className={cx('infor-container')}>
            <p>@Nhân Bùi Thiện</p>
            <p>2089-6440df942ecf6</p>
            <div className="row">
              <span style={{ marginRight: 6 }}>
                <FontAwesomeIcon icon={faMusic} />
              </span>
              <p>Âm thanh gốc - Bùi Thiện Nhân</p>
            </div>
          </div>
        </div>
        <div className={cx('controler')}>
          <div className={cx('operation')}>
            <div className={cx('play-info')}>
              <span
                onClick={(e) => {
                  if (videoRef.current.paused) {
                    setIsPlay(!isPlay);
                    videoRef.current.play();
                  } else {
                    setIsPlay(!isPlay);
                    videoRef.current.pause();
                  }
                }}
                className={cx('play-btn')}
              >
                {isPlay ? <Pause width={16} height={16} /> : <CirclePlay width={16} height={16} />}
              </span>
              <div className="none-select">00:00:12/00:00:14</div>
            </div>
            <div className={cx('operation-btns')}>
              <div
                onClick={() => {
                  if (isMute) {
                    setIsMute(false);
                    videoRef.current.muted = false;
                  } else {
                    setIsMute(true);
                    videoRef.current.muted = true;
                  }
                }}
                className={cx('operation-btn')}
              >
                <FontAwesomeIcon icon={isMute ? faVolumeMute : faVolumeHigh} />
              </div>
              <div className={cx('operation-btn')}>
                <FontAwesomeIcon icon={faExpand} />
              </div>
            </div>
          </div>
          <div className={cx('progress-wrapper')}>
            <div
              style={{
                '--percent': `${percent}%`,
              }}
              className={cx('progress-bar')}
            ></div>
            <input
              onChange={(e) => {
                const value = e.target.value;
                const duration = videoRef.current.duration;
                const targetTime = (duration * value) / 100;
                videoRef.current.currentTime = targetTime;
                setPercent(value);
              }}
              type="range"
            ></input>
          </div>
        </div>
      </div>
      <div className={cx('change-box')}>
        <div className={cx('name-file')}>
          <FontAwesomeIcon
            style={{
              fontSize: 16,
              marginRight: 6,
            }}
            icon={faCircleCheck}
          />
          <span>GL3kAhlr34jMHnEDAOH9D3OnTAAybmdjAAAF.mp4</span>
        </div>
        <button
          onClick={() => {
            fileRef.current.click();
          }}
          className={cx('change-btn')}
        >
          Thay đổi video
        </button>
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
  );
}

export default PhonePreview;
