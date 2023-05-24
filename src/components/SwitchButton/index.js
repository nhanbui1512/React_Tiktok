import classNames from 'classnames/bind';
import styles from './SwitchButton.module.scss';

const cx = classNames.bind(styles);

function SwitchButton() {
    return (
        <label className={cx('switch')}>
            <input type="checkbox" />
            <span className={cx('slider')}></span>
        </label>
    );
}

export default SwitchButton;
