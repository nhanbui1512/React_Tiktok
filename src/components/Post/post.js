import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import HeadlessTippy from '@tippyjs/react/headless';

import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './post.module.scss';

import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCommentDots,
  faMusic,
  faPause,
  faPlay,
  faShare,
  faVolumeHigh,
  faVolumeXmark,
} from '@fortawesome/free-solid-svg-icons';
import { HeartRedIcon, HeartIcon } from '../Icons';

import axios from 'axios';

import Image from '../Image';
import Button from '../Button';
import Volume from './volume';

import { useContext } from 'react';
import { ThemeContext } from '../../Context';
import MenuShare from '../MenuShare';
import Loading from '../Loading';

import { likeVideo, unLikeVideo } from '../../service/likeService';
import { getCookie } from '../../service/local/cookie';

const cx = classNames.bind(styles);

function Post({ data, volumeValue, ChangeVolumeGlobal, route = '' }) {
  const context = useContext(ThemeContext);

  const videoRef = useRef(null);
  const postRef = useRef(null);
  const countRef = useRef(null);
  const [isFollow, setIsFollow] = useState(data.user.is_followed);
  const [isLoading, setIsLoading] = useState(true);

  // tách compoent
  const [isLikes, setIsLikes] = useState(data.is_liked);

  const [isPlay, setIsPlay] = useState(true);

  const HandleFollow = () => {
    const currentUser = context.currentUser;
    if (currentUser) {
      const token = Cookies.get('authToken');
      const idUser = data.user.id;

      if (!isFollow) {
        axios
          .request({
            method: 'post',
            url: `https://tiktok.fullstack.edu.vn/api/users/${idUser}/follow`,
            params: {
              // Các tham số yêu cầu (nếu có)
              param1: 'value1',
              param2: 'value2',
            },
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            // Xử lý phản hồi thành công
            setIsFollow(true);
          })
          .catch((error) => {
            // Xử lý lỗi
            console.error(error);
          });
      } else {
        axios
          .request({
            method: 'post',
            url: `https://tiktok.fullstack.edu.vn/api/users/${idUser}/unfollow`,
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            // Xử lý phản hồi thành công
            setIsFollow(false);
          })
          .catch((error) => {
            // Xử lý lỗi
            console.error(error);
          });
      }

      setIsFollow(!isFollow);
    } else {
      context.setLoginPopper(true);
    }
  };

  const HandleLike = () => {
    const authToken = getCookie('authToken');

    if (context.currentUser) {
      if (isLikes === false) {
        setIsLikes(!isLikes);
        likeVideo({ idVideo: data.id, token: authToken })
          .then((res) => {
            countRef.current.innerText = res.data.likes_count;
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        setIsLikes(!isLikes);
        unLikeVideo({ idVideo: data.id, token: authToken })
          .then((res) => {
            countRef.current.innerText = res.data.likes_count;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      context.setLoginPopper(true);
    }
  };

  useEffect(() => {
    videoRef.current.volume = volumeValue / 100;
  }, [volumeValue]);

  const HandleIsPlay = () => {
    if (isPlay) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlay(!isPlay);
  };

  const HandleMute = () => {
    context.setIsMuted(!context.isMuted);
  };

  return (
    <div className={cx(['wrapper', context.theme])} ref={postRef}>
      <Link className={cx('avatar-container')} to={`@${data.user.nickname}`}>
        <Image className={cx('avatar')} src={data.user.avatar} alt=""></Image>
      </Link>
      <div className={cx('video_content')}>
        <div className={cx('video_heaer')}>
          <div className={cx('profile')}>
            <Link to={`/@${data.user.nickname}`} className={cx('user_profile')}>
              <h3 className={cx('nickname')}>{data.user.nickname}</h3>
              <h4 className={cx('name')}> {`${data.user.first_name} ${data.user.last_name}`} </h4>
            </Link>

            <div className={cx('video_desc')}>
              <span className={cx('title')}>{data.description} </span>
              <Link className={cx('hash-tag')}>
                <strong>#Frozen </strong>
              </Link>
              <Link className={cx('hash-tag')}>
                <strong>#Tiktok</strong>
              </Link>
            </div>
            <h4 className={cx('music_info')}>
              <FontAwesomeIcon className={cx('music_icon')} icon={faMusic}></FontAwesomeIcon>
              <Link className={cx('music_name')}>{data.music}</Link>
            </h4>
          </div>
        </div>

        <div className={cx('video_main')}>
          {/* video tag  */}

          <div className={cx('player-container')}>
            <Link to={`${route}/video/${data.id}`}>
              <video
                volume={volumeValue / 100}
                loop={true}
                autoPlay={false}
                muted={context.isMuted}
                ref={videoRef}
                src={data.file_url}
                onLoadedData={() => {
                  const observer = new IntersectionObserver(
                    ([entry]) => {
                      if (entry.isIntersecting) {
                        const video = videoRef.current;
                        setIsPlay(true);
                        video.play();
                      } else {
                        setIsPlay(false);
                        const video = videoRef.current;

                        if (video) {
                          video.pause();
                        }
                      }
                    },
                    {
                      root: null,
                      rootMargin: '0px',
                      threshold: 0.8,
                    },
                  );

                  const element = postRef.current;
                  if (element) {
                    observer.observe(element);
                  }
                  return () => {
                    observer.unobserve(element);
                  };
                }}
                onPlaying={() => {
                  setIsLoading(false);
                }}
                onWaiting={() => {
                  setIsLoading(true);
                }}
              ></video>
            </Link>

            <div className={cx('play-icon-wrapper')} onClick={HandleIsPlay}>
              {isPlay ? (
                <FontAwesomeIcon className={cx('play-icon')} icon={faPause} />
              ) : (
                <FontAwesomeIcon className={cx('play-icon')} icon={faPlay} />
              )}
            </div>
            <HeadlessTippy
              // visible
              offset={[0, -2]}
              interactive
              delay={[0, 700]}
              placement="top"
              render={(attrs) => (
                <Volume volumeValue={volumeValue} ChangeVolumeGlobal={ChangeVolumeGlobal} videoRef={videoRef} />
              )}
            >
              <div onClick={HandleMute} className={cx('volume-icon-wrapper')}>
                {context.isMuted ? (
                  <FontAwesomeIcon className={cx('volume-icon')} icon={faVolumeXmark} />
                ) : (
                  <FontAwesomeIcon className={cx('volume-icon')} icon={faVolumeHigh} />
                )}
              </div>
            </HeadlessTippy>

            {isLoading && (
              <div className={cx('loading-video')}>
                <Loading className={cx('loading-')} />
              </div>
            )}
          </div>

          <div className={cx('action_group')}>
            <div className={cx('action_btn')}>
              <span onClick={HandleLike} className={cx('action_btn_bg')}>
                {!isLikes ? (
                  <HeartIcon fill={context.theme === 'light' ? '#000' : 'rgba(255, 255, 255, 0.9)'} />
                ) : (
                  <HeartRedIcon className={cx('liked-icon')} />
                )}
              </span>
              <strong ref={countRef} className={cx('count')}>
                {data.likes_count}
              </strong>
            </div>
            <div className={cx('action_btn')}>
              <span className={cx('action_btn_bg')}>
                <FontAwesomeIcon className={cx('icon')} icon={faCommentDots}></FontAwesomeIcon>
              </span>
              <strong className={cx('count')}>{data.comments_count}</strong>
            </div>
            <MenuShare placement="top-start">
              <div className={cx('action_btn')}>
                <span className={cx('action_btn_bg')}>
                  <FontAwesomeIcon className={cx('icon')} icon={faShare}></FontAwesomeIcon>
                </span>
                <strong className={cx('count')}>{data.shares_count}</strong>
              </div>
            </MenuShare>
          </div>
        </div>
      </div>

      <Button onClick={HandleFollow} primary outline className={cx('follow-btn')}>
        {isFollow ? 'Unfollow' : 'Follow'}
      </Button>
    </div>
  );
}

Post.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Post;
