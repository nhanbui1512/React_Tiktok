import { useState, useEffect } from 'react';

import classNames from 'classnames/bind';

import * as userServices from '../../service/userServices';

import styles from './Sidebar.module.scss';
import config from '../../config/index';
import Menu, { MenuItem } from './Menu';
import SuggestedAccounts from '../SuggestedAccounts';

import { HomeIcon, HomeActiveIcon, UserGroupActiveIcon, LiveActiveIcon, UserGroupIcon, LiveIcon } from '../Icons';
import Discovery from '../Discovery/Discovery';
import Footer from './Footer';

const cx = classNames.bind(styles);

function Sidebar({ currentUser = false }) {
    const [suggestedUsers, setsuggestedUsers] = useState([]);

    useEffect(() => {
        userServices
            .getSugggested({ page: 1, perPage: 15 })
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
            {currentUser && <SuggestedAccounts label="Following accounts" data={suggestedUsers} />}
            <Discovery></Discovery>
            <Footer></Footer>
        </aside>
    );
}
export default Sidebar;
