import classNames from 'classnames/bind';
import styles from './post.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Volume({ videoRef }) {
    const [volume, setVolume] = useState(40);

    const HandleChangeVolume = (event) => {
        setVolume(event.target.value);
        videoRef.current.volume = event.target.value / 100;
    };

    return (
        <div className={cx('volume-container')}>
            <input
                onChange={HandleChangeVolume}
                className={cx('volume-control')}
                value={volume}
                min={0}
                max={100}
                step={0.001}
                type={'range'}
            />
        </div>
    );
}
export default Volume;
