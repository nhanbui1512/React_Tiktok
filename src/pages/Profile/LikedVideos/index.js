import classNames from 'classnames/bind';
import styles from './likedVideo.module.scss';
import { useContext, useEffect, useState } from 'react';

import VideoItem from '../VideoItem';
import { getVideosUserLiked } from '../../../service/videoServices';
import { ThemeContext } from '../../../Context';
import { UserIcon } from '../../../components/Icons';
import MainDetail from '../MainDetail';

const cx = classNames.bind(styles);

function LikedVideos({ userId }) {
    const [videos, setVideos] = useState([]);
    const [meta, setMeta] = useState({});
    const [isFetching, setIsFetching] = useState(false);

    const context = useContext(ThemeContext);
    const currentUser = context.currentUser;

    const handleScroll = () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;

        if (scrollTop + clientHeight >= scrollHeight) {
            setIsFetching(true);
        }
    };

    const fetchMoreListItems = () => {
        if (meta.pagination && meta.pagination.current_page < meta.pagination.total_pages) {
            getVideosUserLiked({ idUser: userId, page: meta.pagination.current_page + 1 })
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
            getVideosUserLiked({ idUser: userId, page: 1 })
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
    }, [currentUser, userId]);

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
            </div>
            {context.currentUser || (
                <MainDetail
                    icon={UserIcon}
                    title="Đây là tài khoản riêng tư"
                    desc="Hãy Follow tài khoản này để xem nội dung và các lượt thích của họ"
                    userIcon={true}
                />
            )}
        </div>
    );
}

export default LikedVideos;
