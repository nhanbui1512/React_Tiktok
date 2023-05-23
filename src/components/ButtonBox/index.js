import classNames from 'classnames/bind';
import styles from './ButtonBox.module.scss';

const cx = classNames.bind(styles);

function ButtonBox({ children }) {
    return <div className={cx('wrapper')}>{children}</div>;
}

export default ButtonBox;
