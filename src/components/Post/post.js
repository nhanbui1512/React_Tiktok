import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import HeadlessTippy from '@tippyjs/react/headless';

import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './post.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faMusic, faPause, faPlay, faShare, faVolumeXmark } from '@fortawesome/free-solid-svg-icons';
import { HeartRedIcon, HeartBlackIcon } from '../Icons';

import Image from '../Image';
import Button from '../Button';
import Volume from './volume';

const cx = classNames.bind(styles);

function Post({ data, isMuted = true }) {
    const videoRef = useRef(null);
    const postRef = useRef(null);

    const [isFollow, setIsFollow] = useState(false);

    // tách compoent
    const [isLikes, setIsLikes] = useState(false);

    const [isPlay, setIsPlay] = useState(true);

    const [volume, setVolume] = useState(40);

    const HandleFollow = () => {
        setIsFollow(!isFollow);
    };

    const HandleLike = () => {
        setIsLikes(!isLikes);
    };

    const HandleIsPlay = () => {
        if (isPlay) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlay(!isPlay);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    const video = videoRef.current;
                    setIsPlay(true);
                    video.play();
                } else {
                    const video = videoRef.current;
                    setIsPlay(false);
                    video.pause();
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
    }, []);

    return (
        <div className={cx('wrapper')} ref={postRef}>
            <Link to={`@${data.user.nickname}`}>
                <Image className={cx('avatar')} src={data.user.avatar} alt=""></Image>
            </Link>
            <div className={cx('video_content')}>
                <div className={cx('video_heaer')}>
                    <div className={cx('profile')}>
                        <Link to={`@${data.user.nickname}`} className={cx('user_profile')}>
                            <h3 className={cx('nickname')}>{data.user.nickname}</h3>
                            <h4 className={cx('name')}> {`${data.user.first_name} ${data.user.last_name}`} </h4>
                        </Link>

                        <div className={cx('video_desc')}>
                            <span className={cx('title')}>{data.description} </span>
                            <Link>
                                <strong>#Frozen </strong>
                            </Link>
                            <Link>
                                <strong>#Tiktok</strong>
                            </Link>
                        </div>
                        <h4 className={cx('music_info')}>
                            <FontAwesomeIcon className={cx('music_icon')} icon={faMusic}></FontAwesomeIcon>
                            <Link className={cx('music_name')}>original sound - Andrew</Link>
                        </h4>
                    </div>
                </div>

                <div className={cx('video_main')}>
                    {/* video tag  */}
                    <div className={cx('player-container')}>
                        <video
                            volume={volume / 100}
                            loop={true}
                            autoPlay={false}
                            muted={isMuted}
                            ref={videoRef}
                            src={data.file_url}
                        ></video>
                        <div className={cx('play-icon-wrapper')} onClick={HandleIsPlay}>
                            {isPlay ? (
                                <FontAwesomeIcon className={cx('play-icon')} icon={faPause}></FontAwesomeIcon>
                            ) : (
                                <FontAwesomeIcon className={cx('play-icon')} icon={faPlay}></FontAwesomeIcon>
                            )}
                        </div>
                        <HeadlessTippy
                            // visible
                            offset={[0, -2]}
                            interactive
                            delay={[0, 700]}
                            placement="top"
                            render={(attrs) => <Volume videoRef={videoRef} />}
                        >
                            <div className={cx('volume-icon-wrapper')}>
                                <FontAwesomeIcon className={cx('volume-icon')} icon={faVolumeXmark}></FontAwesomeIcon>
                            </div>
                        </HeadlessTippy>
                    </div>

                    <div className={cx('action_group')}>
                        <div className={cx('action_btn')}>
                            <span onClick={HandleLike} className={cx('action_btn_bg')}>
                                {!isLikes ? <HeartBlackIcon /> : <HeartRedIcon className={cx('liked-icon')} />}
                            </span>
                            <strong className={cx('count')}>{data.likes_count}</strong>
                        </div>
                        <div className={cx('action_btn')}>
                            <span className={cx('action_btn_bg')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faCommentDots}></FontAwesomeIcon>
                            </span>
                            <strong className={cx('count')}>{data.comments_count}</strong>
                        </div>
                        <div className={cx('action_btn')}>
                            <span className={cx('action_btn_bg')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faShare}></FontAwesomeIcon>
                            </span>
                            <strong className={cx('count')}>{data.shares_count}</strong>
                        </div>
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
    isMuted: PropTypes.bool.isRequired,
};

export default Post;
