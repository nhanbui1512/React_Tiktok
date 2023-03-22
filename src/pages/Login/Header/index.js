import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import styes from './Header.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import images from '../../../assests/images';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styes);

function Header() {
    return (
        <div className={cx('container')}>
            <Link to="/" className={cx('logo')}>
                <img alt="" src={images.logo}></img>
            </Link>
            <div>
                <Link className={cx('help')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faQuestionCircle}></FontAwesomeIcon>
                    <span className={cx('text')}>Phản hồi và trợ giúp</span>
                </Link>
            </div>
        </div>
    );
}

export default Header;
