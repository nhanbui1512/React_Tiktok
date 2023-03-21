import classNames from 'classnames/bind';
import styles from './DiscoveryItem.module.scss';

import PropType from 'prop-types';

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

DiscoveryItem.propTypes = {
    icon: PropType.node,
    children: PropType.string.isRequired,
};

export default DiscoveryItem;
