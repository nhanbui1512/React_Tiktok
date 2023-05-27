import classNames from 'classnames/bind';
import styles from './setting.module.scss';

import SideBar from './SidebarSetting';
import Body from './Body';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Setting() {
    return (
        <div className={cx('wrapper')}>
            <SideBar></SideBar>
            <Body></Body>
            <div className={cx('back-btn')}>
                <FontAwesomeIcon className={cx('back-icon')} icon={faArrowLeft}></FontAwesomeIcon>
            </div>
        </div>
    );
}

export default Setting;
