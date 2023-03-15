import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './home.module.scss';

import * as VideoServices from '../../service/videoServices';

import Post from '../../components/Post';

const cx = classNames.bind(styles);

let randomNumber = Math.floor(Math.random() * 5) + 1;

function Home() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        VideoServices.getVideos({ type: 'for-you', page: randomNumber })
            .then((data) => {
                setVideos(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    window.scrollTo(0, 0);
    return (
        <div className={cx('container')}>
            <div className={cx('content')}>
                {videos.map((item) => {
                    return <Post isMuted={true} key={item.id} data={item}></Post>;
                })}
            </div>
        </div>
    );
}
export default Home;
