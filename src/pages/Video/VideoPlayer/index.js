import classNames from 'classnames/bind';
import { useContext, useEffect, useRef, useState } from 'react';
import styles from './VideoPlayer.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faChevronUp,
  faPlay,
  faVolumeHigh,
  faVolumeXmark,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { faFlag } from '@fortawesome/free-regular-svg-icons';
import { ThemeContext } from '../../../Context';
import Volume from '../../../components/Post/volume';
import HeadlessTippy from '@tippyjs/react/headless';

import { Link, useParams } from 'react-router-dom';
const cx = classNames.bind(styles);
function VideoPlayer({ routeBack = '/', mainRoute = '', profile = false }) {
  const [isMuted, setIsmuted] = useState(false);
  const [timePlay, setTimePlay] = useState('00:00');
  const [progressData, setProgressData] = useState('0%');
  const [isPlay, setPlay] = useState(true);
  const videoRef = useRef(null);
  const context = useContext(ThemeContext);
  const [index, setIndex] = useState(0);
  const { id } = useParams();
  const handlePlay = () => {
    if (videoRef.current.readyState === 4) {
      isPlay ? videoRef.current.pause() : videoRef.current.play();
      setPlay(!isPlay);
    }
  };

  useEffect(() => {
    context.setIsMuted(true);
    context.listVideo.map((item, index) => {
      if (item.id === Number(id)) {
        return setIndex(index);
      }
      return null;
    });

    return () => {
      context.setIsMuted(false);
    };
  }, [id, context.listVideo]);

  useEffect(() => {
    videoRef.current.volume = context.volume / 100;
  }, [context.volume]);

  return (
    <div className={cx('video-wrapper')}>
      <div className={cx('video-layer')}>
        <div className={cx('videoPlayerWrapper')}>
          <div
            style={{
              backgroundImage: context.listVideo.length > 0 ? `url('${context.listVideo[index].thumb_url}')` : '',
            }}
            className={cx('video-background')}
          ></div>
          <video
            ref={videoRef}
            onClick={() => {
              handlePlay();
            }}
            autoPlay
            onTimeUpdate={(e) => {
              let currentTime = e.target.currentTime;
              let duration = videoRef.current.duration;
              let progressPercent = (currentTime / duration) * 100;

              let realTime = new Date(currentTime * 1000);
              let secondStr = String(realTime.getSeconds()).padStart(2, '0');
              setTimePlay(`00:${secondStr}`);
              setProgressData(`${progressPercent}%`);
            }}
            className={cx('videoPlayer')}
            src={context.listVideo.length > 0 ? context.listVideo[index].file_url : ''}
            loop
          ></video>
          <div className={cx('playerControlWrapper')}>
            <div className={cx('video-process')} style={{ '--progress-data': progressData }}>
              <div className={cx('loaded-bar')}>
                <div className={cx('progress-dot')}></div>
              </div>
              <input
                onChange={(e) => {
                  let value = e.target.value;
                  let duration = videoRef.current.duration;
                  let setTimeValue = (duration * value) / 100;
                  videoRef.current.currentTime = setTimeValue;
                  setProgressData(`${value}%`);
                }}
                className={cx('video-input')}
                type="range"
                min="0"
                max="100"
                step="1"
              />
            </div>
            <div className={cx('video-timer')}>
              <span>{timePlay}</span>/
              <span>{context.listVideo.length > 0 ? context.listVideo[index].meta.playtime_string : '00:00'}</span>
            </div>
          </div>

          {isPlay || (
            <button
              onClick={() => {
                handlePlay();
              }}
              className={cx('pause-btn')}
            >
              <FontAwesomeIcon className={cx('play-icon')} icon={faPlay} />
            </button>
          )}

          {index > 0 && (
            <Link
              className={cx(['videoPlayerBtn', 'up-btn'])}
              to={
                profile
                  ? `${mainRoute}/videos/${context.listVideo[index - 1].id}`
                  : `${mainRoute}/video/${context.listVideo[index - 1].id}`
              }
            >
              <FontAwesomeIcon className={cx('moving-icon')} icon={faChevronUp} />
            </Link>
          )}

          {index < context.listVideo.length - 1 && (
            <Link
              className={cx(['videoPlayerBtn', 'down-btn'])}
              to={
                profile
                  ? `${mainRoute}/videos/${context.listVideo[index + 1].id}`
                  : `${mainRoute}/video/${context.listVideo[index + 1].id}`
              }
            >
              <FontAwesomeIcon className={cx('moving-icon')} icon={faChevronDown} />
            </Link>
          )}
          <HeadlessTippy
            offset={[0, 10]}
            interactive
            delay={[0, 700]}
            placement="top"
            render={(attrs) => (
              <Volume
                volumeValue={context.volume}
                ChangeVolumeGlobal={context.setVolume}
                videoRef={videoRef}
                className={cx('volume-wrapper')}
              />
            )}
          >
            <button
              onClick={() => {
                setIsmuted(!isMuted);
                videoRef.current.muted = !isMuted;
              }}
              className={cx(['videoPlayerBtn', 'volume-btn'])}
            >
              <FontAwesomeIcon className={cx('volume-icon')} icon={isMuted ? faVolumeXmark : faVolumeHigh} />
            </button>
          </HeadlessTippy>
        </div>
      </div>

      <Link to={`${routeBack}`} className={cx(['close-btn', 'videoPlayerBtn'])}>
        <FontAwesomeIcon className={cx('close-icon')} icon={faXmark} />
      </Link>

      <button className={cx(['videoPlayerBtn', 'report-btn'])}>
        <FontAwesomeIcon className={cx('flag-icon')} icon={faFlag} /> Báo cáo
      </button>
    </div>
  );
}

export default VideoPlayer;
