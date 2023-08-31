import classNames from 'classnames/bind';
import styles from './CommentItem.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function CommentItem({ data = {}, dark = false }) {
    return (
        <div
            className={cx('wrapper', {
                dark,
            })}
        >
            <Link className={cx('avatar')}>
                <img src={data.user.avatar} alt=""></img>
            </Link>
            <div className={cx('infor')}>
                <Link className={cx('username')}>
                    {data.user.first_name} {data.user.last_name}
                </Link>

                <p className={cx('content')}>{data.comment}</p>
                <p className={cx('others')}>
                    <span className={cx('time')}>{data.created_at.split(' ')[0]}</span>
                    <span className={cx('reply-btn')}>Trả lời</span>
                </p>
            </div>
            <div className={cx('act-container')}>
                <span>
                    <FontAwesomeIcon className={cx('heart-icon')} icon={faHeart} />
                </span>
                <span className={cx('count')}>{data.likes_count}</span>
            </div>
        </div>
    );
}

export default CommentItem;
