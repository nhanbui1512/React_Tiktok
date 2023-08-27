import classNames from 'classnames/bind';
import styles from './OwnVideos.module.scss';

import { useRef, useState, useEffect, useContext } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faLock } from '@fortawesome/free-solid-svg-icons';
import { ThemeContext } from '../../../Context';

import VideoItem from '../VideoItem';
import LikedVideos from '../LikedVideos';
import MainDetail from '../MainDetail';
import { BookMarkIcon } from '../../../components/Icons';

const cx = classNames.bind(styles);

function OwnVideos({ videos, userId }) {
    const context = useContext(ThemeContext);

    const [ownVideos, setOwnVideos] = useState([]);

    const bottomLineRef = useRef(null);
    const [sessionState, setSessionState] = useState(0);

    const handleHover = (index) => {
        let value = index * 230;
        bottomLineRef.current.style = `transform: translateX(${value}px);`;
    };

    const handleMouseOut = () => {
        let value = sessionState * 230;
        bottomLineRef.current.style = `transform: translateX(${value}px);`;
    };

    const tabItems = [
        {
            title: 'Video',
        },
        {
            title: 'Yêu Thích',
            icon: <FontAwesomeIcon className={cx('icon-lock')} icon={faBookmark} />,
        },
        {
            title: 'Đã Thích',
            icon: <FontAwesomeIcon className={cx('icon-lock')} icon={faLock} />,
        },
    ];

    const renderSession = () => {
        switch (sessionState) {
            case 0:
                return (
                    <div className={cx('body-container')}>
                        {ownVideos.map((video) => {
                            return <VideoItem data={video} key={video.id}></VideoItem>;
                        })}
                    </div>
                );

            case 1:
                return (
                    <MainDetail
                        icon={BookMarkIcon}
                        title="Bài đăng yêu thích"
                        desc="Bài đăng bạn yêu thích sẽ xuất hiện tại đây."
                    />
                );
            case 2:
                return <LikedVideos userId={userId} />;
            default:
                return (
                    <div className={cx('body-container')}>
                        {ownVideos.map((video) => {
                            return <VideoItem data={video} key={video.id}></VideoItem>;
                        })}
                    </div>
                );
        }
    };

    useEffect(() => {
        setOwnVideos(videos);
    }, [videos]);

    return (
        <div className={cx(['wrapper', context.theme])}>
            <div className={cx('header')}>
                {tabItems.map((element, index) => {
                    // render tabs header
                    return (
                        <p
                            key={index}
                            className={cx('header-tab')}
                            onClick={() => {
                                setSessionState(index);
                            }}
                            onMouseOver={() => {
                                handleHover(index);
                            }}
                            onMouseLeave={() => {
                                handleMouseOut();
                            }}
                        >
                            {element.icon}
                            <span>{element.title}</span>
                        </p>
                    );
                })}

                <div ref={bottomLineRef} className={cx('bottom-line')}></div>
            </div>
            <div>{renderSession()}</div>
        </div>
    );
}

export default OwnVideos;
