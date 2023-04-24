import classNames from 'classnames/bind';
import styles from './listVideoBox.module.scss';

import * as VideoServices from '../../service/videoServices';
import Post from '../Post';
import { useState, useEffect } from 'react';

const cx = classNames.bind(styles);
function ListVideoBox() {
    const item = {
        id: 2088,
        uuid: 'db9b0a87-462a-45ef-b4c4-9079b2201e56',
        user_id: 5287,
        type: '',
        thumb_url: 'https://files.fullstack.edu.vn/f8-tiktok/videos/2088-643ffc2eab141.jpg',
        file_url: 'https://files.fullstack.edu.vn/f8-tiktok/videos/2088-643ffc2e3e310.mp4',
        description: "It's đạo lý timeeeeee",
        music: 'Original sound - Trường',
        is_liked: false,
        likes_count: 0,
        comments_count: 0,
        shares_count: 0,
        views_count: 0,
        viewable: 'public',
        allows: ['comment', 'duet', 'stitch'],
        published_at: '2023-04-19 21:35:26',
        created_at: '2023-04-19 21:35:26',
        updated_at: '2023-04-19 21:35:27',
        user: {
            id: 5287,
            first_name: 'Diêm',
            last_name: 'Trường',
            nickname: 'ddt',
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/5287/642c714f91301.png',
            bio: '✨ 2000✨\nVietnam 🇻🇳\nĐỪNG LẤY VIDEO CỦA TÔI ĐI SO SÁNH NỮA. XIN HÃY TÔN TRỌNG !',
            tick: false,
            is_followed: false,
            followings_count: 11,
            followers_count: 1,
            likes_count: 2,
            website_url: 'https://fullstack.edu.vn/',
            facebook_url: '',
            youtube_url: '',
            twitter_url: '',
            instagram_url: '',
        },
        meta: {
            file_size: 966328,
            file_format: 'mp4',
            mime_type: 'video/mp4',
            playtime_string: '0:13',
            playtime_seconds: 12.77,
            bitrate: 595781.989036805,
            video: {
                dataformat: 'quicktime',
                rotate: 0,
                resolution_x: 576,
                resolution_y: 1024,
                fourcc: 'avc1',
                fourcc_lookup: 'H.264/MPEG-4 AVC',
                frame_rate: 30,
            },
        },
    };

    const [videos, setVideos] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [page, setPage] = useState(1);
    const [volume, SetVolume] = useState(40);

    const [isMuted, setIsMuted] = useState(true);

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
        // setIsFetching(true);
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
    }, [page]);

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
                        key={item.id}
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
