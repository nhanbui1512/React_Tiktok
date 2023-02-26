import PropsTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './menu.module.scss';
const cx = classNames.bind(styles);

function Menu({ children }) {
    return <nav className={cx('wrapper')}>{children}</nav>;
}

Menu.propTypes = {
    children: PropsTypes.node.isRequired,
};

export default Menu;
