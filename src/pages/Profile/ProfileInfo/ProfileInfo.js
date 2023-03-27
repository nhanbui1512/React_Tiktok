import classNames from 'classnames/bind';
import styles from './ProfileInfo.module.scss';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Image from '../../../components/Image';
import Button from '../../../components/Button';
import { faCheckCircle, faLink } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function ProfileInfo({ data }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header-info')}>
                <div className={cx('avatar-wrapper')}>
                    <Image className={cx('avatar')} src={data.avatar} alt="" />
                </div>
                <div className={cx('info-container')}>
                    <h2 className={cx('nick-name')}>
                        {data.nickname}{' '}
                        {data.tick && <FontAwesomeIcon className={cx('icon-check')} icon={faCheckCircle} />}
                    </h2>
                    <h2 className={cx('name')}>{`${data.first_name} ${data.last_name}`}</h2>
                    <Button className={cx('follow-btn')} primary>
                        Follow
                    </Button>
                </div>
            </div>
            <h3 className={cx('count-info')}>
                <div className={cx('div-number')}>
                    <strong>{data.followings_count} </strong>
                    <span className={cx('count-title')}>Đang follow</span>
                </div>
                <div className={cx('div-number')}>
                    <strong>{data.followers_count} </strong>
                    <span className={cx('count-title')}>Follower</span>
                </div>
                <div className={cx('div-number')}>
                    <strong>{data.likes_count} </strong>
                    <span className={cx('count-title')}>Thích</span>
                </div>
            </h3>
            <h2 className={cx('share-desc')}>{data.bio}</h2>
            <div className={cx('link')}>
                <Link>
                    <FontAwesomeIcon className={cx('link-icon')} icon={faLink} />
                    <span>{data.facebook_url}</span>
                </Link>
            </div>
        </div>
    );
}

export default ProfileInfo;
