import classNames from 'classnames/bind';
import styles from './ProfilePage.module.scss';
import ProfileInfo from './ProfileInfo';
import OwnVideos from './OwnVideos';

const cx = classNames.bind(styles);

function Profile() {
    return (
        <div className={cx('wrapper')}>
            <ProfileInfo />
            <OwnVideos />
        </div>
    );
}
export default Profile;
