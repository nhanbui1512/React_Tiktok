import classNames from 'classnames/bind';
import styles from './post.module.scss';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Volume({ volumeValue, ChangeVolumeGlobal, videoRef }) {
    const [volume, setVolume] = useState(volumeValue);

    const HandleChangeVolume = (event) => {
        setVolume(event.target.value);
        videoRef.current.volume = event.target.value / 100;
    };

    const FinishChangeVolume = () => {
        ChangeVolumeGlobal({ volumeValue: volume });
    };

    useEffect(() => {
        setVolume(volumeValue);
    }, [volumeValue]);

    return (
        <div className={cx('volume-container')}>
            <input
                onMouseUp={FinishChangeVolume}
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
