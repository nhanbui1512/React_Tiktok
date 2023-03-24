import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

import styles from './ProfileLayout.module.scss';
const cx = classNames.bind(styles);

function ProfileLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header className={cx('header')} />
            <div className={cx('container')}>
                <Sidebar />
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}
ProfileLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
export default ProfileLayout;
