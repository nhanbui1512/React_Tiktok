import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';
const cx = classNames.bind(styles);

function Button({
    to,
    href,
    primary = false,
    outline = false,
    small = false,
    large = false,
    text = false,
    disabled = false,
    children,
    onClick,
    ...passProps
}) {
    let Comp = 'button';
    const classes = cx('wrapper', {
        primary,
        outline,
        small,
        large,
        text,
        disabled,
    });
    const Props = {
        onClick,
        ...passProps,
    };
    if (disabled) {
        delete Props.onClick;
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
            <span>{children}</span>
        </Comp>
    );
}
export default Button;
