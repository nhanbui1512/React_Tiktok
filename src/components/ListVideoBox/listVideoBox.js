import classNames from 'classnames/bind';
import styles from './listVideoBox.module.scss';

import * as VideoServices from '../../service/videoServices';
import Post from '../Post';
import { useState, useEffect } from 'react';

const cx = classNames.bind(styles);
// let randomNumber = Math.floor(Math.random() * 5) + 1;

function ListVideoBox() {
    const [videos, setVideos] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [page, setPage] = useState(1);

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
        setIsFetching(true);
    };

    const fetchMoreListItems = () => {
        console.log('fetching');
        // setTimeout(() => {
        VideoServices.getVideos({ type: 'for-you', page: page })
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
        // }, 2000);
    };

    useEffect(() => {
        // VideoServices.getVideos({ type: 'for-you', page: page })
        //     .then((data) => {
        //         setVideos(data);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // useEffect(() => {}, []);

    useEffect(() => {
        if (!isFetching) return;
        fetchMoreListItems();
    }, [isFetching]);

    return (
        <div className={cx('content')}>
            {videos.map((item, index) => {
                return <Post isMuted={true} key={index} data={item}></Post>;
            })}
        </div>
    );
}

export default ListVideoBox;
