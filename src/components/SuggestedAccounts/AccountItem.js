import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Image from '../Image';
import { Wrapper as PopperWrapper } from '../Popper';
import AccountPreview from './AccountPreview';

import styles from './SuggestedAccounts.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function AccountItem({ data }) {
    const renderPreview = (props) => {
        return (
            <div tabIndex="-1" {...props}>
                <PopperWrapper className={cx('preview-container')}>
                    <div className={cx('preview')}>
                        <AccountPreview data={data} />
                    </div>
                </PopperWrapper>
            </div>
        );
    };
    return (
        <Tippy interactive offset={[-20, 0]} render={renderPreview} delay={[800, 0]} placement="bottom">
            <Link to={`/@${data.nickname}`} className={cx('account-item')}>
                <Image className={cx('avatar')} alt={data.nickname} src={data.avatar} />

                <div className={cx('item-info')}>
                    <p className={cx('nickname')}>
                        <strong>{data.nickname} </strong>
                        {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                    </p>
                    <p className={cx('name')}>{`${data.first_name} ${data.last_name}`}</p>
                </div>
            </Link>
        </Tippy>
    );
}

AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AccountItem;
