import classNames from 'classnames/bind';
import styles from './setting.module.scss';

import SideBar from './SidebarSetting';
import Body from './Body';

const cx = classNames.bind(styles);

function Setting() {
    return (
        <div className={cx('wrapper')}>
            <SideBar></SideBar>
            <Body></Body>
        </div>
    );
}

export default Setting;
