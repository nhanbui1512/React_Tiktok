import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

import { ThemeContext } from '../../Context';
import { useContext } from 'react';

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    primary = false,
    outline = false,
    dark = false,
    small = false,
    large = false,
    text = false,
    disabled = false,
    rounded = false,
    divbox = false,
    leftIcon,
    rightIcon,
    children,
    className,
    onClick,
    ...passProps
}) {
    let Comp = 'button';
    const classes = cx('wrapper', {
        [className]: className,
        dark,
        primary,
        outline,
        small,
        rounded,
        large,
        text,
        divbox,
        disabled,
    });
    const Props = {
        onClick,
        ...passProps,
    };
    // remove event listener when button disable
    if (disabled) {
        Object.keys(Props).forEach((key) => {
            if (key.startsWith('on') && typeof Props[key] === 'function') {
                delete Props[key];
            }
        });
    }
    if (to) {
        Props.to = to;
        Comp = Link;
    } else if (href) {
        Props.href = href;
        Comp = 'a';
    }
    return (
        <Comp className={classes} {...Props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

Button.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    primary: PropTypes.bool,
    divbox: PropTypes.bool,
    outline: PropTypes.bool,
    small: PropTypes.bool,
    large: PropTypes.bool,
    text: PropTypes.bool,
    disabled: PropTypes.bool,
    rounded: PropTypes.bool,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func,
};
export default Button;
