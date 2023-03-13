import { useState, useEffect } from 'react';

import classNames from 'classnames/bind';

import * as userServices from '../../service/userServices';

import styles from './Sidebar.module.scss';
import config from '../../config/index';
import Menu, { MenuItem } from './Menu';
import SuggestedAccounts from '../SuggestedAccounts';

import { HomeIcon, HomeActiveIcon, UserGroupActiveIcon, LiveActiveIcon, UserGroupIcon, LiveIcon } from '../Icons';

const cx = classNames.bind(styles);

function Sidebar() {
    const [suggestedUsers, setsuggestedUsers] = useState([]);

    useEffect(() => {
        userServices
            .getSugggested({ page: 1, perPage: 5 })
            .then((data) => {
                setsuggestedUsers(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem
                    title="For you"
                    to={config.routes.root}
                    icon={<HomeIcon />}
                    activeIcon={<HomeActiveIcon />}
                ></MenuItem>
                <MenuItem
                    title="Following"
                    to={config.routes.following}
                    icon={<UserGroupIcon />}
                    activeIcon={<UserGroupActiveIcon />}
                ></MenuItem>
                <MenuItem
                    title="Live"
                    to={config.routes.live}
                    icon={<LiveIcon />}
                    activeIcon={<LiveActiveIcon />}
                ></MenuItem>
            </Menu>
            <SuggestedAccounts label="Suggested accounts" data={suggestedUsers} />
            <SuggestedAccounts label="Following accounts" data={suggestedUsers} />
            {/* <SuggestedAccounts label="Following accounts" /> */}
        </aside>
    );
}
export default Sidebar;
