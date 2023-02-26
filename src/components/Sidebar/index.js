import classNames from 'classnames/bind';

import styles from './Sidebar.module.scss';
import config from '../../config/index';
import Menu, { MenuItem } from './Menu';
import { HomeIcon, UserGroupIcon, LiveIcon } from '../Icons';
const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem title="For you" to={config.routes.root} icon={<HomeIcon />}></MenuItem>
                <MenuItem title="Following" to={config.routes.following} icon={<UserGroupIcon />}></MenuItem>
                <MenuItem title="Live" to={config.routes.live} icon={<LiveIcon />}></MenuItem>
            </Menu>
        </aside>
    );
}
export default Sidebar;
