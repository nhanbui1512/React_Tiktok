import classNames from 'classnames/bind';
import styles from 'Discovery.module.scss';
const cx = classNames.bind(styles);

function Discovery() {
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('header')}>Discovery</h2>
        </div>
    );
}

export default Discovery;
