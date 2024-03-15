import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { InboxIcon, PlusTiktok, UserIcon } from '../../../components/Icons';
import { faCompass } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function Footer() {
  return (
    <div className={cx('wrapper')}>
      <footer className={cx('container')}>
        <Link to={'/'} className={cx('nav-btn')}>
          <FontAwesomeIcon className={cx('nav-icon')} icon={faHome} />
          <span className={cx('nav-title')}>Trang chủ</span>
        </Link>
        <Link className={cx('nav-btn')} to={'/discovery'}>
          <FontAwesomeIcon className={cx('nav-icon')} icon={faCompass} />
          <span className={cx('nav-title')}>Khám Phá</span>
        </Link>
        <Link className={cx('nav-btn')}>
          <PlusTiktok />
        </Link>
        <Link className={cx('nav-btn')}>
          <InboxIcon className={cx('nav-icon')} />
          <span className={cx('nav-title')}>Inbox</span>
        </Link>
        <Link className={cx('nav-btn')} to={'/profile'}>
          <UserIcon className={cx('nav-icon')} />
          <span className={cx('nav-title')}>Hồ sơ</span>
        </Link>
      </footer>
    </div>
  );
}
export default Footer;
