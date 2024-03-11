import classNames from 'classnames/bind';
import styles from './Loader.module.scss';
const cx = classNames.bind(styles);

function Loader() {
  return (
    <svg className={cx('wrapper')} viewBox="25 25 50 50">
      <circle r="20" cy="50" cx="50"></circle>
    </svg>
  );
}

export default Loader;
