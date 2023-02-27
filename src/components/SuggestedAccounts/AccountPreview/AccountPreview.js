import classNames from 'classnames/bind';
import styles from './AccountPreview.module.scss';

import Button from '../../Button';

const cx = classNames.bind(styles);

function AccountPreview() {
    return (
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <img className={cx('avatar')} src="" alt="" />
                <Button primary>Follow</Button>
            </header>
        </div>
    );
}
export default AccountPreview;
