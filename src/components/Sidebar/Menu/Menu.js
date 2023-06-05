import PropsTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './menu.module.scss';

import { useContext } from 'react';
import { ThemeContext } from '../../../Context';

const cx = classNames.bind(styles);

function Menu({ children }) {
    const context = useContext(ThemeContext);

    return <nav className={cx(['wrapper', context.theme])}>{children}</nav>;
}

Menu.propTypes = {
    children: PropsTypes.node.isRequired,
};

export default Menu;
