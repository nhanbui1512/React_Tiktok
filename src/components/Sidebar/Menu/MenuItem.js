import classNames from 'classnames/bind';
import styles from './menu.module.scss';

import PropsTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);
function MenuItem({ title, to, icon, activeIcon }) {
    return (
        <NavLink className={(nav) => cx('menu-item', { active: nav.isActive })} to={to}>
            <span className={cx('icon')}>{icon}</span>
            <span className={cx('active-icon')}>{activeIcon}</span>
            <span className={cx('title')}>{title}</span>
        </NavLink>
    );
}

MenuItem.propTypes = {
    title: PropsTypes.string.isRequired,
    to: PropsTypes.string.isRequired,
    icon: PropsTypes.node.isRequired,
    activeIcon: PropsTypes.node.isRequired,
};

export default MenuItem;
