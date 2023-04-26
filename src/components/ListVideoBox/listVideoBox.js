import classNames from 'classnames/bind';
import styles from './listVideoBox.module.scss';

import * as VideoServices from '../../service/videoServices';
import Post from '../Post';
import { useState, useEffect } from 'react';

const cx = classNames.bind(styles);
function ListVideoBox() {
    const [videos, setVideos] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [page, setPage] = useState(1);
    const [volume, SetVolume] = useState(40);

    const [isMuted, setIsMuted] = useState(true);

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
        setIsFetching(true);
    };

    const ChangeVolumeGlobal = ({ volumeValue }) => {
        SetVolume(volumeValue);
    };

    const SetMuteGlobal = () => {
        setIsMuted(!isMuted);
    };

    const fetchMoreListItems = () => {
        console.log('fetching');
        VideoServices.getVideos({ type: 'for-you', page: page + 1 })
            .then((data) => {
                setVideos((prevState) => [...prevState, ...data]);
            })
            .then(() => {
                setPage(page + 1);
            })
            .catch((err) => {
                console.log(err);
            });

        setIsFetching(false);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        VideoServices.getVideos({ type: 'for-you', page: page })
            .then((data) => {
                setVideos(data);
            })
            .catch((err) => {
                console.log(err);
            });

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (!isFetching) return;
        fetchMoreListItems();
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
        </div>
    );
}

export default ListVideoBox;
