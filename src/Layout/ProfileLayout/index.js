import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

import styles from './ProfileLayout.module.scss';
const cx = classNames.bind(styles);

function ProfileLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header isFullWidth={true} className={cx('header_profile')} />
            <div className={cx('container')}>
                <div className={cx('sidebar_container')}>
                    <Sidebar />
                </div>
                <div className={cx('body')}>{children}</div>
            </div>
        </div>
    );
}
ProfileLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
export default ProfileLayout;
