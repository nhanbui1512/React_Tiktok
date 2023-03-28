import classNames from 'classnames/bind';
import styles from './ProfilePage.module.scss';
import ProfileInfo from './ProfileInfo';
import OwnVideos from './OwnVideos';

import * as UserService from '../../service/userServices';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Profile() {
    window.scroll(0, 0);
    let { nickname } = useParams();
    const [userData, setUserData] = useState({});

    useEffect(() => {
        UserService.getUser({ nickname }).then((data) => {
            setUserData(data.data);
            return data.videos;
        });
    }, [nickname]);

    return (
        <div className={cx('wrapper')}>
            <ProfileInfo data={userData} />
            {userData.videos && <OwnVideos videos={userData.videos} />}
        </div>
    );
}
export default Profile;
