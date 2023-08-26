import classNames from 'classnames/bind';
import styles from './Saved.module.scss';
const cx = classNames.bind(styles);

function Saved() {
    return <div className={cx('wrapper')}>Saved</div>;
}

export default Saved;
