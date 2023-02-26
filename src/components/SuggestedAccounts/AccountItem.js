import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';

import PropTypes from 'prop-types';

import styles from './SuggestedAccounts.module.scss';

const cx = classNames.bind(styles);

function AccountItem({ data }) {
    return (
        <div className={cx('account-item')}>
            <img className={cx('avatar')} alt={data.nickname} src={data.src} />

            <div className={cx('item-info')}>
                <p className={cx('nickname')}>
                    <strong>{data.nickname} </strong>
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                </p>
                <p className={cx('name')}>{data.name}</p>
            </div>
        </div>
    );
}

AccountItem.propTypes = {
    data: PropTypes.node.isRequired,
};

export default AccountItem;
