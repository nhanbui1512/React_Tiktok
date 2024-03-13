import classNames from 'classnames/bind';
import styles from './PopperUpdate.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UpdateUser } from '../../../service/userServices';
import { useContext, useRef, useState } from 'react';
import Image from '../../../components/Image';
import { PenLine } from '../../../components/Icons';
import Button from '../../../components/Button';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import NotiBar from '../../../components/NotiBar';
import { ThemeContext } from '../../../Context';
const cx = classNames.bind(styles);

function PopperUpdate({ data, setEditPopper, setUserData }) {
  const [updateNoti, setUpdateNoti] = useState(false);

  const [bio, setBio] = useState(data.bio || '');
  const [firstName, setFirstName] = useState(data.first_name || '');
  const [lastName, setLastName] = useState(data.last_name || '');
  const [websiteUrl, setWebsiteUrl] = useState(data.website_url || '');
  const inputFileRef = useRef();
  const [imageFile, setImageFile] = useState('');

  const context = useContext(ThemeContext);
  const handleUpdate = (e) => {
    let formData = new FormData();

    if (imageFile) {
      formData.append('avatar', imageFile);
    }
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('bio', bio);
    formData.append('website_url', websiteUrl);

    UpdateUser(formData)
      .then((res) => {
        setUserData((prev) => {
          prev.first_name = res.data.first_name;
          prev.last_name = res.data.last_name;
          prev.bio = res.data.bio;
          prev.website_url = res.data.website_url;
          prev.avatar = res.data.avatar;
          return prev;
        });
        setUpdateNoti(true);
        setTimeout(() => {
          setUpdateNoti(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className={cx('edit-popper', { dark: context.theme === 'dark' })}>
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
                        backgroundImage: `url(${imageFile?.preview || data.avatar})`,
                      }}
                      className={cx('infor-avatar')}
                      alt=""
                    />
                    <div
                      onClick={() => {
                        inputFileRef.current.click();
                      }}
                      className={cx('edit-avatar-btn')}
                    >
                      <PenLine className={cx('pen-icon')} />
                    </div>
                  </div>
                  <input
                    style={{ display: 'none' }}
                    max={5}
                    accept=".jpg, .jpeg, .png"
                    onChange={(e) => {
                      if (e.target.files.length > 0 && e.target.files[0].type.includes('image')) {
                        const file = e.target.files[0];
                        file.preview = URL.createObjectURL(file);
                        setImageFile((prev) => {
                          if (prev.preview) {
                            URL.revokeObjectURL(prev.preview);
                          }
                          return file;
                        });
                        e.target.value = null;
                      }
                    }}
                    ref={inputFileRef}
                    type="file"
                    className="disappear"
                  />
                </div>
                <div className={cx('infor-box')}>
                  <div className={cx('infor-label')}>First name</div>
                  <div className={cx('infor-edit-wrap')}>
                    <input
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                      value={firstName}
                      className={cx('infor-input')}
                    />

                    <p style={{ marginTop: 8 }} className={cx('infor-description')}>
                      Usernames can only contain letters, numbers, underscores, and periods. Changing your username will
                      also change your profile link.
                    </p>
                  </div>
                </div>
                <div className={cx('infor-box')}>
                  <div className={cx('infor-label')}>Last name</div>
                  <div className={cx('infor-edit-wrap')}>
                    <input
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                      value={lastName}
                      className={cx('infor-input')}
                    />
                    <p style={{ marginTop: 16 }} className={cx('infor-description')}>
                      Your nickname can only be changed once every 7 days.
                    </p>
                  </div>
                </div>
                <div className={cx('infor-box')}>
                  <div className={cx('infor-label')}>Bio</div>
                  <div className={cx('infor-edit-wrap')}>
                    <textarea
                      onChange={(e) => {
                        setBio(e.target.value);
                      }}
                      value={bio}
                      placeholder="Bio"
                    ></textarea>
                    <span className={cx('count-text')}>{`${bio.length || 0}/80`}</span>
                  </div>
                </div>

                <div className={cx('infor-box')}>
                  <div className={cx('infor-label')}>Website URL</div>
                  <div className={cx('infor-edit-wrap')}>
                    <input
                      onChange={(e) => {
                        setWebsiteUrl(e.target.value);
                      }}
                      value={websiteUrl}
                      className={cx('infor-input')}
                    />

                    <p style={{ marginTop: 8 }} className={cx('infor-description')}>
                      Change your website url
                    </p>
                  </div>
                </div>
                <div className={cx('footer')}>
                  <Button
                    dark={context.theme === 'dark'}
                    onClick={() => {
                      setEditPopper(false);
                    }}
                    divbox
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleUpdate} primary>
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {updateNoti && <NotiBar>Cập nhật thành công</NotiBar>}
    </>
  );
}

export default PopperUpdate;
