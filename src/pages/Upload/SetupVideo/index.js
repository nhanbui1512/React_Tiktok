import classNames from 'classnames/bind';
import styles from './SetupVideo.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faSortDown } from '@fortawesome/free-solid-svg-icons';
import Slider from '../Slider';
import SwitchButton from '../../../components/SwitchButton';
import Button from '../../../components/Button';

import PhonePreview from '../../../components/PhonePreview';
import { Wrapper as PopperWrapper } from '../../../components/Popper';
import MenuItem from '../../../components/Popper/Menu/MenuItem';
import { useState, useContext } from 'react';
import { UploadContext } from '..';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);
const menu = [
  {
    title: 'Công khai',
  },
  {
    title: 'Follower',
  },
  {
    title: 'Riêng tư',
  },
];

function SetupVideo() {
  const [dropDownMenu, setDropdownMenu] = useState(false);
  const [privacy, setPrivacy] = useState('Công khai');
  const context = useContext(UploadContext);
  const [musicName, setMusicName] = useState('Âm thanh gốc');
  const [title, setTitle] = useState(context.file.name.slice(0, -4));
  const [musicInput, setMusicInput] = useState(false);

  return (
    <div className={cx('wrapper')}>
      <h2 className={cx('header')}>Tải Video lên</h2>
      <p className={cx('description')}>Đăng video vào tài khoản của bạn</p>

      <div className="mg_24_0">
        <div className={cx('body')}>
          <PhonePreview
            musicName={musicName}
            titleState={[title, setTitle]}
            file={context.file}
            setFile={context.setFile}
          />
          <div className={cx('adjustment')}>
            <div>
              <div className={cx('input-wrap')}>
                <span className={cx('title')}>Chú thích</span>
                <span className={cx('count')}>8/250</span>
              </div>
              <div className={cx('input-box')}>
                {musicInput || (
                  <input
                    className={cx('title-input', { musicInput: musicInput })}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    defaultValue={title}
                  />
                )}
                {musicInput && (
                  <input
                    className={cx('music-input', { musicInput: musicInput })}
                    onChange={(e) => {
                      setMusicName(e.target.value);
                    }}
                    defaultValue={musicName}
                  />
                )}
                <button
                  onClick={() => {
                    setMusicInput(!musicInput);
                  }}
                  className={cx('edit-btn')}
                >
                  <FontAwesomeIcon icon={!musicInput ? faMusic : faPenToSquare} />
                </button>
              </div>
            </div>
            <Slider />
            <div>
              <p style={{ marginTop: 24 }} className={cx('title')}>
                Ai có thể xem video này
              </p>
              <div
                onClick={() => {
                  setDropdownMenu(!dropDownMenu);
                }}
                className={cx('drop-down-menu')}
              >
                <span className={cx('title')}>{privacy}</span>
                <span>
                  <FontAwesomeIcon className={cx('arrow-icon')} icon={faSortDown} />
                </span>
                {dropDownMenu && (
                  <PopperWrapper className={cx('menu-wrapper')}>
                    {menu.map((item, index) => (
                      <MenuItem
                        key={index}
                        className={cx('menu-item')}
                        data={item}
                        onClick={() => {
                          setPrivacy(item.title);
                        }}
                      />
                    ))}
                  </PopperWrapper>
                )}
              </div>
            </div>
            <div>
              <p style={{ marginTop: 24 }} className={cx('title')}>
                Cho phép người dùng:
              </p>
              <div className="row">
                <label className={cx('allow-group')}>
                  <input defaultChecked={true} className={cx('checkbox')} type="checkbox" />
                  <span className={cx('title')}>Comment</span>
                </label>
                <label className={cx('allow-group')}>
                  <input defaultChecked={true} className={cx('checkbox')} type="checkbox" />
                  <span className={cx('title')}>Duet</span>
                </label>
                <label className={cx('allow-group')}>
                  <input defaultChecked={true} className={cx('checkbox')} type="checkbox" />
                  <span className={cx('title')}>Stitch</span>
                </label>
              </div>
              <div style={{ alignItems: 'center' }} className="row mt-24">
                <p style={{ marginRight: 14 }} className={cx('title')}>
                  Chạy trình kiểm tra bản quyền
                </p>
                <div>
                  <SwitchButton isChecked={false} />
                </div>
              </div>
              <p style={{ marginTop: 4 }} className={cx('coppyright-desc')}>
                Chúng tôi sẽ kiểm tra xem video của bạn có sử dụng âm thanh vi phạm bản quyền hay không. Nếu chúng tôi
                phát hiện có vi phạm, bạn có thể chỉnh sửa video trước khi đăng.
              </p>
              <div className="mt-24">
                <Button className={cx('bottom-btn')} divbox>
                  Huỷ bỏ
                </Button>
                <Button
                  onClick={() => {
                    context.setUpload(true);
                  }}
                  className={cx('bottom-btn')}
                  primary
                >
                  Đăng
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SetupVideo;
