import styles from './loading.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Loading({ className }) {
    const classes = cx('tiktok', {
        [className]: className,
    });
    return <span className={classes}></span>;
}

export default Loading;
