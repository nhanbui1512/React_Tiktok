import classNames from 'classnames/bind';
import styles from './CommentCreator.module.scss';
const cx = classNames.bind(styles);

function CommentCreator() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('creator-form')}>
                <div className={cx('input-container')}>
                    <textarea
                        rows="1"
                        className={cx('input')}
                        placeholder="Thêm bình luận..."
                        spellCheck={false}
                    ></textarea>
                    {/* <div>icon</div> */}
                </div>
                <div>Post btn</div>
            </div>
        </div>
    );
}

export default CommentCreator;
