import classNames from 'classnames/bind';
import styles from './ProfilePage.module.scss';
import ProfileInfo from './ProfileInfo';

const cx = classNames.bind(styles);

function Profile() {
    return (
        <div className={cx('wrapper')}>
            <ProfileInfo />
            <div>Videos</div>
        </div>
    );
}
export default Profile;
