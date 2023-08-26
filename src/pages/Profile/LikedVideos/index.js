import classNames from 'classnames/bind';
import styles from './likedVideo.module.scss';
import { useContext, useEffect, useState } from 'react';

import VideoItem from '../VideoItem';
import { getVideosUserLiked } from '../../../service/videoServices';
import { ThemeContext } from '../../../Context';
const cx = classNames.bind(styles);

function LikedVideos() {
    const [videos, setVideos] = useState([]);
    const [meta, setMeta] = useState({});
    const [isFetching, setIsFetching] = useState(false);

    const context = useContext(ThemeContext);

    const handleScroll = () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;

        if (scrollTop + clientHeight >= scrollHeight) {
            setIsFetching(true);
        }
    };

    const fetchMoreListItems = () => {
        if (meta.pagination.current_page < meta.pagination.total_pages) {
            getVideosUserLiked({ idUser: 5377, page: meta.pagination.current_page + 1 })
                .then((res) => {
                    setVideos((prevState) => [...prevState, ...res.data]);
                    setMeta(res.meta);
                })
                .then(() => {
                    setIsFetching(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    //start
    useEffect(() => {
        context.currentUser === true &&
            getVideosUserLiked({ idUser: context.user.id, page: 1 })
                .then((res) => {
                    setVideos(res.data);
                    setMeta(res.meta);
                })
                .catch((err) => {
                    console.log(err);
                });

        if (meta) {
            window.addEventListener('scroll', handleScroll);
        }
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (!isFetching) return;
        setTimeout(() => {
            fetchMoreListItems();
        }, 500);
    }, [isFetching]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                {videos.map((video) => {
                    return <VideoItem data={video} key={video.id} />;
                })}
                {context.currentUser || <>loked</>}
            </div>
        </div>
    );
}

export default LikedVideos;
