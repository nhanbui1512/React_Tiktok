import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';

import PropTypes from 'prop-types';

import styles from './SuggestedAccounts.module.scss';

const cx = classNames.bind(styles);

function AccountItem() {
    return (
        <div className={cx('account-item')}>
            <img
                className={cx('avatar')}
                alt=""
                src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-aiso/65d3c6b1d1e205c75536ccf1f26d552d~c5_100x100.jpeg?x-expires=1677560400&x-signature=QCzaC%2FGhfMyz1lZKqyIhQ1WU5Ec%3D"
            />

            <div className={cx('item-info')}>
                <p className={cx('nickname')}>
                    <strong>quocnguyenphu </strong>
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                </p>
                <p className={cx('name')}>Quốc Nguyễn Phú</p>
            </div>
        </div>
    );
}

AccountItem.propTypes = {};

export default AccountItem;
