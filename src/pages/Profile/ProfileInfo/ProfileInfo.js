import classNames from 'classnames/bind';
import styles from './ProfileInfo.module.scss';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Image from '../../../components/Image';
import Button from '../../../components/Button';
import { faCheckCircle, faEllipsis, faLink, faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../../../Context';
import { PenLine, ShareIconRegular } from '../../../components/Icons';
import MenuShare from '../../../components/MenuShare';

import { FollowUser, UnFollow } from '../../../service/userServices';
import { getCookie } from '../../../service/local/cookie';
import NotiBar from '../../../components/NotiBar';

const cx = classNames.bind(styles);

function ProfileInfo({ data }) {
  const context = useContext(ThemeContext);
  const [editPopper, setEditPopper] = useState(false);
  const [updateNoti, setUpdateNoti] = useState(false);

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
        <Link>
          <FontAwesomeIcon className={cx('link-icon')} icon={faLink} />
          <span className={cx('path')}>{data.facebook_url}</span>
        </Link>
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

      {editPopper && (
        <div className={cx('edit-popper')}>
          <div className={cx('main')}>
            <div className={cx('popper-container')}>
              <div className={cx('popper-content')}>
                <div className={cx('popper-header')}>
                  <h1>Edit profile</h1>
                  <div
                    onClick={() => {
                      setEditPopper(false);
                    }}
                    className={cx('close-btn')}
                  >
                    <FontAwesomeIcon color="rgba(22, 24, 35, 0.75)" className={cx('close-icon')} icon={faXmark} />
                  </div>
                </div>
                <div
                  style={{
                    paddingTop: 8,
                    paddingRight: 24,
                    paddingLeft: 24,
                  }}
                >
                  <div className={cx('infor-box')}>
                    <div className={cx('infor-label')}>Profile photo</div>
                    <div className={cx('avatar-container')}>
                      <Image
                        style={{
                          backgroundImage: `url(${data.avatar})`,
                        }}
                        className={cx('infor-avatar')}
                        alt=""
                      />
                      <div className={cx('edit-avatar-btn')}>
                        <PenLine />
                      </div>
                    </div>
                  </div>
                  <div className={cx('infor-box')}>
                    <div className={cx('infor-label')}>Username</div>
                    <div className={cx('infor-edit-wrap')}>
                      <input defaultValue={data.nickname} className={cx('infor-input')} />
                      <p style={{ marginTop: 16 }} className={cx('infor-description')}>
                        www.tiktok.com/@30433639985
                      </p>
                      <p style={{ marginTop: 8 }} className={cx('infor-description')}>
                        Usernames can only contain letters, numbers, underscores, and periods. Changing your username
                        will also change your profile link.
                      </p>
                    </div>
                  </div>
                  <div className={cx('infor-box')}>
                    <div className={cx('infor-label')}>Name</div>
                    <div className={cx('infor-edit-wrap')}>
                      <input defaultValue={`${data.first_name} ${data.last_name}`} className={cx('infor-input')} />
                      <p style={{ marginTop: 16 }} className={cx('infor-description')}>
                        Your nickname can only be changed once every 7 days.
                      </p>
                    </div>
                  </div>
                  <div className={cx('infor-box')}>
                    <div className={cx('infor-label')}>Bio</div>
                    <div className={cx('infor-edit-wrap')}>
                      <textarea defaultValue={data.bio} placeholder="Bio"></textarea>
                      <span className={cx('count-text')}>0/80</span>
                    </div>
                  </div>
                  <div className={cx('footer')}>
                    <Button
                      onClick={() => {
                        setEditPopper(false);
                      }}
                      divbox
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        setUpdateNoti(true);
                        setTimeout(() => {
                          setUpdateNoti(false);
                        }, 1500);
                      }}
                      primary
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {updateNoti && <NotiBar>Cập nhật thành công</NotiBar>}
    </div>
  );
}

export default ProfileInfo;
