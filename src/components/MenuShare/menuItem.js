import classNames from 'classnames/bind';
import styles from './menu.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function MenuItem({ icon, children }) {
    return (
        <Link className={cx('menu-item')}>
            <span className={cx('icon')}>{icon}</span>
            <span className={cx('title')}>{children}</span>
        </Link>
    );
}

export default MenuItem;
