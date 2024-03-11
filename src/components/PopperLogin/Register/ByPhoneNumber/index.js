import classNames from 'classnames/bind';
import styles from '../../PopperLogin.module.scss';

import { useState } from 'react';
import Loader from '../Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { register } from '../../../../service/registerService';

const cx = classNames.bind(styles);

function ByPhoneNumber() {
  const [email, setEmail] = useState('');
  const [passWord, setPassword] = useState('');
  const [confirmPassWord, setConfirmPassWord] = useState('');
  const [confirmPolicy, setConfirmPolicy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [success, setSuccess] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState('');

  const checkFill = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.trim() !== '' && passWord.trim() !== '' && emailRegex.test(email)) {
      return true;
    }
    return false;
  };

  const checkLengPass = () => {
    return passWord.length > 8 && passWord.length < 20;
  };

  const checkFormatPass = () => {
    // Kiểm tra xem mật khẩu có chứa ít nhất một chữ cái đặc biệt, một chữ cái viết hoa và một số không
    var chuaChuCaiDacBiet = /[!@#$%^&*(),.?":{}|<>]/;
    var chuaChuCaiInHoa = /[A-Z]/;
    var chuaSo = /[0-9]/;

    if (!chuaChuCaiDacBiet.test(passWord) || !chuaChuCaiInHoa.test(passWord) || !chuaSo.test(passWord)) {
      return false;
    }
    return true;
  };

  const checkTotal = () => {
    return (
      checkFill() === true && checkLengPass() && checkFormatPass() && passWord === confirmPassWord && confirmPolicy
    );
  };

  const handleRegister = () => {
    if (checkTotal() === true) {
      setLoading(true);

      register(email, passWord)
        .then((res) => {
          setInvalidEmail('');
          setLoading(false);
          setEmail('');
          setConfirmPassWord('');
          setPassword('');

          setSuccess(true);
        })
        .catch((err) => {
          setLoading(false);
          if (err.response.status === 409) {
            // bật message email đã trùng
            setInvalidEmail('Email đã tồn tại');
          } else if (err.response.status === 422) {
            setInvalidEmail('Email không hợp lệ');
          }
        });
    }
  };

  return (
    <div className={cx('content')}>
      <h1 className={cx('header')}>Đăng Ký</h1>
      <div
        style={{
          position: 'relative',
        }}
        className={cx('form-login')}
      >
        <div className={cx('form-header')}>
          <label>Email </label>
        </div>
        <div className={cx('form-input')}>
          <input
            placeholder="Địa chỉ email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>

        {invalidEmail && (
          <div className={cx('rules-wrapper')}>
            <div
              style={{
                color: 'red',
              }}
              className={cx('rule-desc')}
            >
              <FontAwesomeIcon className={cx('rule-icon')} icon={faXmark} />
              <span>{invalidEmail}</span>
            </div>
          </div>
        )}
        <div className={cx('form-input')}>
          <input
            type={showPass ? 'text' : 'password'}
            placeholder="Mật Khẩu"
            value={passWord}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div
            onClick={() => {
              setShowPass(!showPass);
            }}
            className={cx('show-btn')}
          >
            <FontAwesomeIcon className={cx('show-icon')} icon={!showPass ? faEye : faEyeSlash} />
          </div>
        </div>
        <div className={cx('rules-wrapper')}>
          <p className={cx('rule-header')}>Mật khẩu của bạn phải gồm:</p>
          <div className={cx('rule-desc', { valid: checkLengPass() })}>
            <FontAwesomeIcon className={cx('rule-icon')} icon={faCheck} />
            <span>8 đến 20 ký tự</span>
          </div>

          <div className={cx('rule-desc', { valid: checkFormatPass() })}>
            <FontAwesomeIcon className={cx('rule-icon')} icon={faCheck} />
            <span>Các chữ cái, số và ký tự đặc biệt</span>
          </div>
        </div>
        <div className={cx('form-input')}>
          <input
            type={showConfirm ? 'text' : 'password'}
            placeholder="Xác Nhận Mật Khẩu"
            value={confirmPassWord}
            onChange={(e) => {
              setConfirmPassWord(e.target.value);
            }}
          />
          <div
            onClick={() => {
              setShowConfirm(!showConfirm);
            }}
            className={cx('show-btn')}
          >
            <FontAwesomeIcon className={cx('show-icon')} icon={!showConfirm ? faEye : faEyeSlash} />
          </div>
        </div>
        <div className={cx('rules-wrapper')}>
          <p className={cx('rule-header')}>Xác nhận mật khẩu:</p>
          <div className={cx('rule-desc', { valid: passWord === confirmPassWord })}>
            <FontAwesomeIcon className={cx('rule-icon')} icon={faCheck} />
            <span>Trùng khớp với mật khẩu</span>
          </div>
        </div>

        <div className={cx('form-confirm')}>
          <input
            onChange={(e) => {
              setConfirmPolicy(!confirmPolicy);
            }}
            type="checkbox"
            checked={confirmPolicy}
          />
          <p className={cx('confirm-desc')}>
            Nhận nội dung thịnh hành, bản tin, khuyến mại, đề xuất và thông tin cập nhật tài khoản được gửi đến email
            của bạn
          </p>
        </div>

        <button className={checkTotal() ? cx(['submit-btn', 'primary']) : cx('submit-btn')} onClick={handleRegister}>
          <span>Đăng Ký</span>
        </button>
        {success && (
          <div style={{ marginTop: 10 }} className={cx('rule-desc', { valid: true })}>
            <FontAwesomeIcon className={cx('rule-icon')} icon={faCheck} />
            <span>Đăng ký tài khoản thành công</span>
          </div>
        )}
        {loading && (
          <div className={cx('loading-container')}>
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
}

export default ByPhoneNumber;
