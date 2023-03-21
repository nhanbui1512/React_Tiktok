import classNames from 'classnames/bind';
import styles from './DiscoveryItem.module.scss';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

function DiscoveryItem({ icon, children }) {
    return (
        <Link to={'/tag'} className={cx('container')}>
            <div className={cx('wrapper')}>
                <span className={cx('icon')}>{icon}</span>
                <p className={cx('content')}>{children}</p>
            </div>
        </Link>
    );
}
export default DiscoveryItem;
