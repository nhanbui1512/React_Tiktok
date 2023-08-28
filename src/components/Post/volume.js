import classNames from 'classnames/bind';
import styles from './post.module.scss';
import { useEffect, useRef, useState } from 'react';

const cx = classNames.bind(styles);

function Volume({ volumeValue = 50, ChangeVolumeGlobal = () => {}, videoRef, className }) {
    const [volume, setVolume] = useState(volumeValue);
    const inputRef = useRef(null);

    const HandleChangeVolume = (event) => {
        var valueChange = event.target.value;
        setVolume(valueChange);
        inputRef.current.style.background = `linear-gradient(90deg,#fff ${valueChange}%,rgb(255 255 255 / 34%)${valueChange}%`;
        videoRef.current.volume = event.target.value / 100;
    };

    const FinishChangeVolume = () => {
        ChangeVolumeGlobal(volume);
    };

    useEffect(() => {
        setVolume(volumeValue);
        inputRef.current.style.background = `linear-gradient(90deg,#fff ${volumeValue}%,rgb(255 255 255 / 34%)${volumeValue}%`;
    }, [volumeValue]);

    const classes = cx('volume-container', { [className]: className });
    return (
        <div className={classes}>
            <input
                ref={inputRef}
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
