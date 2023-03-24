import classNames from 'classnames/bind';
import styles from './ProfileInfo.module.scss';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Image from '../../../components/Image';
import Button from '../../../components/Button';
import { faCheckCircle, faLink } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function ProfileInfo() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header-info')}>
                <Image className={cx('avatar')} src="" alt="" />
                <div className={cx('info-container')}>
                    <h2 className={cx('nick-name')}>
                        theanh28entertainment <FontAwesomeIcon className={cx('icon-check')} icon={faCheckCircle} />
                    </h2>
                    <h2 className={cx('name')}>Theanh28 Entertainment</h2>
                    <Button className={cx('follow-btn')} primary>
                        Follow
                    </Button>
                </div>
            </div>
            <h3 className={cx('count-info')}>
                <div className={cx('div-number')}>
                    <strong>18 </strong>
                    <span className={cx('count-title')}>Đang follow</span>
                </div>
                <div className={cx('div-number')}>
                    <strong>8.8M </strong>
                    <span className={cx('count-title')}>Follower</span>
                </div>
                <div className={cx('div-number')}>
                    <strong>712.2M </strong>
                    <span className={cx('count-title')}>Thích</span>
                </div>
            </h3>
            <h2 className={cx('share-desc')}>
                📲 KÊNH TIN TỨC ĐỜI SỐNG XÃ HỘI 🇻🇳 <br /> Hotline: 0983.663.092 <br /> Mail: sales@kenh28.vn
            </h2>
            <div className={cx('link')}>
                <Link>
                    <FontAwesomeIcon className={cx('link-icon')} icon={faLink} />
                    <span>theanh28.my.canva.site/</span>
                </Link>
            </div>
        </div>
    );
}

export default ProfileInfo;
