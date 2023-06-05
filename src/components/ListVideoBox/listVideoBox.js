import classNames from 'classnames/bind';
import styles from './listVideoBox.module.scss';

import * as VideoServices from '../../service/videoServices';
import Post from '../Post';
import { useState, useEffect } from 'react';
import Loading from '../loading';

const cx = classNames.bind(styles);
function ListVideoBox({ authToken }) {
    const [videos, setVideos] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [page, setPage] = useState(1);
    const [volume, SetVolume] = useState(40);

    const [isMuted, setIsMuted] = useState(true);

    const handleScroll = () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;

        if (scrollTop + clientHeight >= scrollHeight) {
            setIsFetching(true);
        }
    };

    const ChangeVolumeGlobal = ({ volumeValue }) => {
        SetVolume(volumeValue);
    };

    const SetMuteGlobal = () => {
        setIsMuted(!isMuted);
    };

    const fetchMoreListItems = () => {
        if (authToken) {
            VideoServices.getFollowingVideos({ type: 'for-you', page: page + 1, token: authToken })
                .then((data) => {
                    setVideos((prevState) => [...prevState, ...data]);
                })
                .then(() => {
                    setPage(page + 1);
                    setIsFetching(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            VideoServices.getVideos({ type: 'for-you', page: page + 1 })
                .then((data) => {
                    setVideos((prevState) => [...prevState, ...data]);
                })
                .then(() => {
                    setPage(page + 1);
                    setIsFetching(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);

        if (authToken) {
            VideoServices.getFollowingVideos({ page: page, token: authToken })
                .then((data) => {
                    setVideos(data);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            VideoServices.getVideos({ type: 'for-you', page: page })
                .then((data) => {
                    setVideos(data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (!isFetching) return;
        setTimeout(() => {
            fetchMoreListItems();
        }, 500);
    }, [isFetching]);

    return (
        <div className={cx('content')}>
            {videos.map((item, index) => {
                return (
                    <Post
                        isMuted={isMuted}
                        key={index}
                        data={item}
                        volumeValue={volume}
                        ChangeVolumeGlobal={ChangeVolumeGlobal}
                        SetMuteGlobal={SetMuteGlobal}
                    ></Post>
                );
            })}

            {isFetching && (
                <div className={cx('spinner-container')}>
                    <Loading></Loading>
                </div>
            )}
        </div>
    );
}

export default ListVideoBox;
