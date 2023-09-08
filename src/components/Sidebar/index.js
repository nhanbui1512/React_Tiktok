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

import { getCookie } from '../../service/local/cookie';

import { useContext } from 'react';
import { ThemeContext } from '../../Context';

const cx = classNames.bind(styles);

function Sidebar() {
    const [suggestedUsers, setsuggestedUsers] = useState([]);

    const [followingUsers, setFollowingUsers] = useState([]);

    const context = useContext(ThemeContext);

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

    useEffect(() => {
        if (context.currentUser === true) {
            const token = getCookie('authToken') || '';

            userServices
                .getFollowingUsers({ token: token, page: 1 })
                .then((res) => {
                    setFollowingUsers(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [context.currentUser]);

    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem title="For you" to={'/'} icon={<HomeIcon />} activeIcon={<HomeActiveIcon />}></MenuItem>
                <MenuItem
                    title="Following"
                    to={'/following'}
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
            {context.currentUser && <SuggestedAccounts label="Following accounts" data={followingUsers} />}
            <Discovery></Discovery>
            <Footer></Footer>
        </aside>
    );
}
export default Sidebar;
