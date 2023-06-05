import classNames from 'classnames/bind';
import styles from './AccountPreview.module.scss';
import PropTypes from 'prop-types';

import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../../Button';
import Image from '../../Image';
import { useState, useContext } from 'react';
import { ThemeContext } from '../../../Context';

const cx = classNames.bind(styles);

function AccountPreview({ data }) {
    const context = useContext(ThemeContext);

    const [followStatus, setFollowStatus] = useState(false);

    const handleFollow = () => {
        setFollowStatus(!followStatus);
    };

    return (
        <div className={cx(['wrapper', context.theme])}>
            <div className={cx('header')}>
                <Image className={cx('avatar')} src={data.avatar} alt={data.first_name} />
                <div>
                    <Button className={cx('follow-btn')} primary onClick={handleFollow}>
                        {!followStatus ? 'Follow' : 'Unfollow'}
                    </Button>
                </div>
            </div>

            <div className={cx('body')}>
                <p className={cx('nickname')}>
                    <strong>{data.nickname}</strong>
                    {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                </p>
                <p className={cx('name')}>{`${data.first_name} ${data.last_name}`}</p>
                <p className={cx('analytics')}>
                    <strong className={cx('value')}>{data.followers_count} </strong>
                    <span className={cx('label')}>Followers</span>
                    <strong className={cx('value')}>{data.likes_count} </strong>
                    <span className={cx('label')}>Likes</span>
                </p>
            </div>
        </div>
    );
}

AccountPreview.propTypes = {
    data: PropTypes.object.isRequired,
};
export default AccountPreview;
