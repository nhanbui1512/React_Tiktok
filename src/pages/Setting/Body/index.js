import classNames from 'classnames/bind';
import styles from './body.module.scss';

const cx = classNames.bind(styles);

function Body() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('row-content')}>
                <>
                    <div className={cx('div-manage-container')}>
                        <div className={cx('title')}>Quản Lý Tài Khoản</div>
                        <div className={cx('body')}>
                            <div className={cx('title-mini')}>Kiểm soát tài khoản</div>
                            <div className={cx('option')}>Xóa tài khoản</div>
                            <div className={cx('delete-btn')}>Xóa</div>
                        </div>
                    </div>
                </>
            </div>
        </div>
    );
}
export default Body;
