import classNames from 'classnames/bind';
import styles from './SideBarSetting.module.scss';

import { UserIcon, LookIcon, RingIcon, ShopIcon } from '../../../components/Icons';

const cx = classNames.bind(styles);

function SidebarSetting({ className, primary }) {
    // const classes = cx('wrapper', {
    //     [className]: className,
    //     primary,
    // });

    return (
        <div className={cx('wrapper')}>
            <div className={cx(['item', 'primary'])}>
                <span className={cx('icon')}>
                    <UserIcon></UserIcon>
                </span>
                <span className={cx(['title', 'primary'])}>Quản lý tài khoản</span>
            </div>
            <div className={cx('item')}>
                <span className={cx('icon')}>
                    <LookIcon></LookIcon>
                </span>
                <span className={cx('title')}>Quyền Riêng Tư</span>
            </div>
            <div className={cx('item')}>
                <span className={cx('icon')}>
                    <RingIcon></RingIcon>
                </span>
                <span className={cx('title')}>Thông Báo Đẩy</span>
            </div>
            <div className={cx('item')}>
                <span className={cx('icon')}>
                    <ShopIcon></ShopIcon>
                </span>
                <span className={cx('title')}>Tài Khoản Doanh Nghiệp</span>
            </div>
        </div>
    );
}

export default SidebarSetting;
