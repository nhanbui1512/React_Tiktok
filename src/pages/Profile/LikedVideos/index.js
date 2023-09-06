import classNames from 'classnames/bind';
import styles from './likedVideo.module.scss';
import { useContext, useEffect, useState } from 'react';

import VideoItem from '../VideoItem';
import { getVideosUserLiked } from '../../../service/videoServices';
import { ThemeContext } from '../../../Context';
import { UserIcon } from '../../../components/Icons';
import MainDetail from '../MainDetail';

import { getCookie } from '../../../service/local/cookie';

const cx = classNames.bind(styles);

function LikedVideos({ userId }) {
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
        const authToken = getCookie('authToken') || '';
        if (meta.pagination && meta.pagination.current_page < meta.pagination.total_pages) {
            getVideosUserLiked({ idUser: userId, page: meta.pagination.current_page + 1, token: authToken })
                .then((res) => {
                    setVideos((prevState) => [...prevState, ...res.data]);
                    setMeta(res.meta);
                    context.setListVideo((prevState) => [...prevState, ...res.data]);
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
        const authToken = getCookie('authToken') || '';

        context.currentUser === true &&
            getVideosUserLiked({ idUser: userId, page: 1, token: authToken })
                .then((res) => {
                    setVideos(res.data);
                    setMeta(res.meta);
                    context.setListVideo(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });

        if (meta) {
            window.addEventListener('scroll', handleScroll);
        }
        return () => window.removeEventListener('scroll', handleScroll);
    }, [context.currentUser, userId]);

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
