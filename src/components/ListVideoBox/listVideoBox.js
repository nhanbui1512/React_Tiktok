import classNames from 'classnames/bind';
import styles from './listVideoBox.module.scss';

import * as VideoServices from '../../service/videoServices';
import Post from '../Post';
import { useState, useEffect, useContext } from 'react';
import Loading from '../Loading';
import { ThemeContext } from '../../Context';
import { getCookie } from '../../service/local/cookie';

const cx = classNames.bind(styles);
function ListVideoBox() {
    const [videos, setVideos] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [page, setPage] = useState(1);
    const [volume, SetVolume] = useState(40);

    const authToken = getCookie('authToken') || '';

    const [isMuted, setIsMuted] = useState(true);

    const context = useContext(ThemeContext);

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
        VideoServices.getVideos({ type: 'for-you', page: page + 1, token: authToken })
            .then((data) => {
                setVideos((prevState) => [...prevState, ...data]);
                context.setListVideo((prevState) => [...prevState, ...data]);
            })
            .then(() => {
                setPage(page + 1);
                setIsFetching(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // start
    useEffect(() => {
        VideoServices.getVideos({ type: 'for-you', page: page, token: authToken })
            .then((data) => {
                setVideos(data);
                context.setListVideo(data);
            })
            .catch((err) => {
                console.log(err);
            });

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [authToken]);

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
