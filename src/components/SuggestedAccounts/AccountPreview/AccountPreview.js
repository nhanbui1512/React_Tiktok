import classNames from 'classnames/bind';
import styles from './AccountPreview.module.scss';

import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../../Button';
import { useState } from 'react';

const cx = classNames.bind(styles);

function AccountPreview({ data }) {
    const [followStatus, setFollowStatus] = useState(false);

    const handleFollow = () => {
        setFollowStatus(!followStatus);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <img className={cx('avatar')} src={data.src} alt={data.name} />
                <div>
                    <Button className={cx('follow-btn')} primary onClick={handleFollow}>
                        {!followStatus ? 'Follow' : 'Unfollow'}
                    </Button>
                </div>
            </div>

            <div className={cx('body')}>
                <p className={cx('nickname')}>
                    <strong>{data.nickname}</strong>
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                </p>
                <p className={cx('name')}>{data.name} </p>
                <p className={cx('analytics')}>
                    <strong className={cx('value')}>8.2M </strong>
                    <span className={cx('label')}>Followers</span>
                    <strong className={cx('value')}>8.2M </strong>
                    <span className={cx('label')}>Likes</span>
                </p>
            </div>
        </div>
    );
}
export default AccountPreview;
