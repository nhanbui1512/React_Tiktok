import classNames from 'classnames/bind';
import styles from './SetupVideo.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faSortDown } from '@fortawesome/free-solid-svg-icons';
import Slider from '../Slider';
import SwitchButton from '../../../components/SwitchButton';
import Button from '../../../components/Button';
const cx = classNames.bind(styles);

function SetupVideo() {
  return (
    <div className={cx('wrapper')}>
      <h2 className={cx('header')}>Tải Video lên</h2>
      <p className={cx('description')}>Đăng video vào tài khoản của bạn</p>
      <div className={cx('body')}>
        <div className={cx('phone-preview')}>Phone Preview</div>
        <div className={cx('adjustment')}>
          <div>
            <div className={cx('input-wrap')}>
              <span className={cx('title')}>Chú thích</span>
              <span className={cx('count')}>8/250</span>
            </div>
            <div className={cx('input-box')}>
              <input />
              <button className={cx('edit-btn')}>
                <FontAwesomeIcon icon={faMusic} />
              </button>
            </div>
          </div>
          <Slider />
          <div>
            <p style={{ marginTop: 24 }} className={cx('title')}>
              Ai có thể xem video này
            </p>
            <div className={cx('drop-down-menu')}>
              <span className={cx('title')}>Công khai</span>
              <span>
                <FontAwesomeIcon className={cx('arrow-icon')} icon={faSortDown} />
              </span>
            </div>
          </div>
          <div>
            <p style={{ marginTop: 24 }} className={cx('title')}>
              Cho phép người dùng:
            </p>
            <div className="row">
              <label className={cx('allow-group')}>
                <input className={cx('checkbox')} type="checkbox" />
                <span className={cx('title')}>Comment</span>
              </label>
              <label className={cx('allow-group')}>
                <input className={cx('checkbox')} type="checkbox" />
                <span className={cx('title')}>Duet</span>
              </label>
              <label className={cx('allow-group')}>
                <input className={cx('checkbox')} type="checkbox" />
                <span className={cx('title')}>Stitch</span>
              </label>
            </div>
            <div style={{ alignItems: 'center' }} className="row mt-24">
              <p style={{ marginRight: 14 }} className={cx('title')}>
                Chạy trình kiểm tra bản quyền
              </p>
              <div>
                <SwitchButton />
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
              <Button className={cx('bottom-btn')} primary>
                Đăng
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SetupVideo;
