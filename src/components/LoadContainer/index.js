import classNames from 'classnames/bind';
import styles from './loadcontainer.module.scss';

const cx = classNames.bind(styles);

function LoadContainer() {
    return (
        <div className={cx('loader-container')}>
            <div className={cx('spinner')}></div>
        </div>
    );
}

export default LoadContainer;
