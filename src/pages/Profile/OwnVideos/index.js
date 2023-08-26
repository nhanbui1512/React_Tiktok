import classNames from 'classnames/bind';
import styles from './OwnVideos.module.scss';

import { useRef, useState, useEffect, useContext } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faLock } from '@fortawesome/free-solid-svg-icons';
import { ThemeContext } from '../../../Context';

import VideoItem from '../VideoItem';
import LikedVideos from '../LikedVideos';
import Saved from '../Saved';

const cx = classNames.bind(styles);

function OwnVideos({ videos }) {
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
            title: 'Đã Thích',
            icon: <FontAwesomeIcon className={cx('icon-lock')} icon={faLock} />,
        },
        {
            title: 'Yêu Thích',
            icon: <FontAwesomeIcon className={cx('icon-lock')} icon={faBookmark} />,
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
                return <LikedVideos />;

            case 2:
                return <Saved />;
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
