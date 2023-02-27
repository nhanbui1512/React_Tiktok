import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './SuggestedAccounts.module.scss';
import AccountItem from './AccountItem';

const cx = classNames.bind(styles);
const accountSuggested = [
    {
        nickname: 'manhtienkhoi_',
        name: 'Mạnh Tiến Khôi 🐯',
        src: 'https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/0995309d9b40283f49325641059892f6~c5_100x100.jpeg?x-expires=1677585600&x-signature=%2BIszDnJRE3fwIYS4Uy0VKxett9Y%3D',
    },

    {
        nickname: 'theanh28entertainment',
        name: 'Theanh28 Entertainment',
        src: 'https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-aiso/65d3c6b1d1e205c75536ccf1f26d552d~c5_100x100.jpeg?x-expires=1677585600&x-signature=pD62OGp%2BvWTUfrq%2FL%2Fz6PM23J74%3D',
    },

    {
        nickname: 'annhien_boiboi',
        name: 'AnNhiên ❤️ BốiBối',
        src: 'https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/39911deb09b62b80810dec42c0722bbd~c5_100x100.jpeg?x-expires=1677585600&x-signature=RtvzKzG%2BCMtosD9KpAjTHq%2BYLTs%3D',
    },
    {
        nickname: 'vietphuongthoa98',
        name: 'Việt Phương Thoa',
        src: 'https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/2f1e2a4fa8bc91de38d1c4e926d19cba~c5_100x100.jpeg?x-expires=1677585600&x-signature=0ZMw7gHBWHklyt6NN9YgXiVbbNw%3D',
    },
];
function SuggestedAccounts({ label }) {
    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>

            {accountSuggested.map((item) => {
                return <AccountItem data={item}></AccountItem>;
            })}

            <p className={cx('more-btn')}>See all</p>
        </div>
    );
}

SuggestedAccounts.propTypes = {
    label: PropTypes.string.isRequired,
};

export default SuggestedAccounts;
