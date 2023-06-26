import classNames from 'classnames/bind';
import styles from './NotiBar.module.scss';

const cx = classNames.bind(styles);

function NotiBar({ children }) {
    return (
        <div className={cx('wrapper')}>
            <p className={cx('container')}>{children}</p>
        </div>
    );
}
export default NotiBar;
