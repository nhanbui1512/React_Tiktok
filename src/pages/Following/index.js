import classNames from 'classnames/bind';
import styles from './following.module.scss';

import ListVideoBox from '../../components/ListVideoBox/listVideoBox';

const cx = classNames.bind(styles);

function Following() {
    window.scrollTo(0, 0);
    return (
        <div className={cx('container')}>
            <ListVideoBox />
        </div>
    );
}
export default Following;
