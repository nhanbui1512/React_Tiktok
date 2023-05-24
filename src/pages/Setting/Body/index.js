import classNames from 'classnames/bind';
import styles from './body.module.scss';
import SwitchButton from '../../../components/SwitchButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faCaretDown } from '@fortawesome/free-solid-svg-icons';

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

            <div className={cx('row-content')}>
                <>
                    <div className={cx('div-manage-container')}>
                        <div className={cx('title')}>Quyền Riêng Tư</div>
                        <div className={cx('body')}>
                            <div className={cx('title-mini')}>Khám Phá</div>
                            <div className={cx('option')}>Tài khoản riêng tư</div>
                            <div className={cx('description')}>
                                Với tài khoản riêng tư, chỉ những người dùng được bạn phê duyệt mới có thể follow bạn và
                                xem các video của bạn. Những follower hiện tại của bạn sẽ không bị ảnh hưởng.{' '}
                            </div>
                            <div className={cx('switch-btn-container')}>
                                <SwitchButton></SwitchButton>
                            </div>
                        </div>
                    </div>
                </>
            </div>

            <div className={cx('row-content')}>
                <>
                    <div className={cx('div-manage-container')}>
                        <div className={cx('title')}>Dữ liệu</div>
                        <div className={cx('body')}>
                            <div className={cx('option')}>Tải về dữ liệu của bạn</div>
                            <div className={cx('description')}>Lấy bản sao dữ liệu Tiktok cá nhân</div>
                            <div className={cx('right-icon-container')}>
                                <FontAwesomeIcon className={cx('right-icon')} icon={faAngleRight}></FontAwesomeIcon>
                            </div>
                        </div>
                    </div>
                </>
            </div>

            <div className={cx('row-content')}>
                <>
                    <div className={cx('div-manage-container')}>
                        <div className={cx('title')}>Thông Báo Đấy</div>
                        <div className={cx('body')}>
                            <div className={cx('title-mini')}>Thông báo trong máy tính để bàn</div>
                            <div className={cx('option')}>Cho phép trong trình duyệt</div>
                            <div className={cx('description')}>
                                Luôn cập nhật các thông báo về lượt thích, bình luận, video mới nhất và nhiều điều khác
                                trên máy tính. Bạn có thể tắt thông báo bất cứ lúc nào.
                            </div>
                            <div className={cx('switch-btn-container')}>
                                <SwitchButton></SwitchButton>
                            </div>
                        </div>
                    </div>
                </>
            </div>

            <div className={cx('row-content')}>
                <>
                    <div className={cx('div-manage-container')}>
                        <div className={cx('body')}>
                            <div className={cx('title-mini')}>Tùy Chọn Của Bạn</div>
                            <div className={cx('description')}>Tùy chọn của bạn sẽ được đồng bộ với Tiktok</div>
                            <div className={cx('option')}>Tương Tác</div>
                            <div className={cx('description')}>
                                Tùy chọn của bạn sẽ được đồng bộ với TiktokLượt thích, bình luận, follower mới, lượt
                                nhắc đến và lượt gắn thẻ
                            </div>
                            <div className={cx('right-icon-container')}>
                                <FontAwesomeIcon className={cx('right-icon')} icon={faCaretDown}></FontAwesomeIcon>
                            </div>
                        </div>
                    </div>
                </>
            </div>
        </div>
    );
}
export default Body;
