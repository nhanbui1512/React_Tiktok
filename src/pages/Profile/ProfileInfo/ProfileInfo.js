import classNames from 'classnames/bind';
import styles from './ProfileInfo.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Image from '../../../components/Image';
import Button from '../../../components/Button';
import { faCheckCircle, faEllipsis, faLink, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../../../Context';
import { ShareIconRegular } from '../../../components/Icons';
import MenuShare from '../../../components/MenuShare';

import { FollowUser, UnFollow } from '../../../service/userServices';
import { getCookie } from '../../../service/local/cookie';
import PopperUpdate from '../PopperUpdate';

const cx = classNames.bind(styles);

function ProfileInfo({ data, setUserData = () => {} }) {
  const context = useContext(ThemeContext);
  const [editPopper, setEditPopper] = useState(false);

  const [isFollow, setIsFollow] = useState(false);
  useEffect(() => {
    setIsFollow(data.is_followed);
  }, [data]);

  const handleFollow = () => {
    if (!context.currentUser) {
      context.setLoginPopper(true);
    } else {
      const token = getCookie('authToken') || '';

      setIsFollow(!isFollow);
      isFollow
        ? UnFollow({ token, idUser: data.id })
            .then((res) => {
              setIsFollow(!isFollow);
            })
            .catch((err) => {
              console.log(err);
            })
        : FollowUser({ token, idUser: data.id })
            .then((res) => {
              setIsFollow(!isFollow);
            })
            .catch((err) => {
              console.log(err);
            });
    }
  };

  return (
    <div className={cx(['wrapper', context.theme])}>
      <div className={cx('header-info')}>
        <div className={cx('avatar-wrapper')}>
          <Image className={cx('avatar')} src={data.avatar} alt={data.nickname} />
        </div>
        <div className={cx('info-container')}>
          <h2 className={cx('nick-name')}>
            {data.nickname} {data.tick && <FontAwesomeIcon className={cx('icon-check')} icon={faCheckCircle} />}
          </h2>
          <h2 className={cx('name')}>{`${data.first_name} ${data.last_name}`}</h2>

          {context.currentUser && context.user.id === data.id ? (
            <Button
              onClick={() => {
                setEditPopper(true);
              }}
              className={cx('edit-btn')}
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
      <div className={cx('link-box')}>
        <div>
          <FontAwesomeIcon className={cx('link-icon')} icon={faLink} />

          <a className={cx('path')} href={data.website_url} target="_blank" rel="noopener noreferrer">
            {data.website_url}
          </a>
        </div>
      </div>

      <div className={cx('profile-action')}>
        <div className={cx('action-wrapper')}>
          <MenuShare placement="bottom-end" offset={[30, 4]}>
            <span className={cx('profile-action-icon')}>
              <ShareIconRegular width="24px" height="24px" />
            </span>
          </MenuShare>

          <span className={cx('profile-action-icon')}>
            <FontAwesomeIcon width={24} height={24} icon={faEllipsis}></FontAwesomeIcon>
          </span>
        </div>
      </div>

      {editPopper && <PopperUpdate data={data} setEditPopper={setEditPopper} setUserData={setUserData} />}
    </div>
  );
}

export default ProfileInfo;
