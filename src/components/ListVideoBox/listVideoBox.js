import classNames from 'classnames/bind';
import styles from './listVideoBox.module.scss';

import * as VideoServices from '../../service/videoServices';
import Post from '../Post';
import { useState, useEffect } from 'react';

const cx = classNames.bind(styles);
let randomNumber = Math.floor(Math.random() * 5) + 1;

function ListVideoBox() {
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
    return (
        <div className={cx('content')}>
            {videos.map((item) => {
                return <Post isMuted={true} key={item.id} data={item}></Post>;
            })}
        </div>
    );
}

export default ListVideoBox;
