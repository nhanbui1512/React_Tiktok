import styles from './loading.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function loading({ className }) {
    const classes = cx('tiktok', {
        [className]: className,
    });
    return <span className={classes}></span>;
}

export default loading;
