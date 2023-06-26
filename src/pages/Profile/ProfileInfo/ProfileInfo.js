import classNames from 'classnames/bind';
import styles from './ProfileInfo.module.scss';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Image from '../../../components/Image';
import Button from '../../../components/Button';
import { faCheckCircle, faLink, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useState, useContext } from 'react';
import { ThemeContext } from '../../../Context';

const cx = classNames.bind(styles);

function ProfileInfo({ data }) {
    const context = useContext(ThemeContext);

    const [isFollow, setIsFollow] = useState(false);

    const handleFollow = () => {
        setIsFollow(!isFollow);
    };
    return (
        <div className={cx(['wrapper', context.theme])}>
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

                    {context.currentUser ? (
                        <Button
                            className={cx('upload-btn')}
                            divbox
                            text
                            leftIcon={<FontAwesomeIcon className={cx('edit-icon')} icon={faPenToSquare} />}
                        >
                            Edit Profile
                        </Button>
                    ) : (
                        <Button onClick={handleFollow} className={cx('follow-btn')} primary>
                            {!isFollow ? 'Follow' : 'UnFollow'}
                        </Button>
                    )}
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
