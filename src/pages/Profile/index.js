import classNames from 'classnames/bind';
import styles from './ProfilePage.module.scss';
import ProfileInfo from './ProfileInfo';
import OwnVideos from './OwnVideos';

import * as UserService from '../../service/userServices';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCookie } from '../../service/local/cookie';
import { useContext } from 'react';
import { ThemeContext } from '../../Context';

const cx = classNames.bind(styles);

function Profile() {
    window.scroll(0, 0);

    const context = useContext(ThemeContext);

    let { nickname } = useParams();
    const [userData, setUserData] = useState({});
    useEffect(() => {
        const token = getCookie('authToken') || '';
        UserService.getUser({ nickname, token: token }).then((data) => {
            setUserData(data.data);
            return data.videos;
        });
    }, [nickname, context.currentUser]);

    return (
        <div className={cx('wrapper')}>
            <ProfileInfo data={userData} />
            {userData.videos && <OwnVideos videos={userData.videos} userId={userData.id} />}
        </div>
    );
}
export default Profile;
