import classNames from 'classnames/bind';
import styles from './DivBox.module.scss';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

function DivBox({ icon, children }) {
    return (
        <div className={cx('container')}>
            <div className={cx('icon')}>{icon}</div>
            <p className={cx('content')}>{children}</p>
        </div>
    );
}

DivBox.propTypes = {
    icon: PropTypes.node,
    children: PropTypes.string.isRequired,
};

export default DivBox;
