import classNames from 'classnames/bind';
import styles from './CommentCreator.module.scss';
const cx = classNames.bind(styles);

function CommentCreator({ theme = 'light' }) {
    return (
        <div className={cx(['wrapper', theme])}>
            <div className={cx('creator-form')}>
                <div className={cx('input-container')}>
                    <textarea
                        rows="1"
                        className={cx('input-comment')}
                        placeholder="Thêm bình luận..."
                        spellCheck={false}
                    ></textarea>
                </div>
                <button className={cx('comment_btn')}>
                    <span>Đăng</span>
                </button>
            </div>
        </div>
    );
}

export default CommentCreator;
