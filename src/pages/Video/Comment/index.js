import classNames from 'classnames/bind';
import styles from './Comment.module.scss';
import Button from '../../../components/Button';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart, faMusic } from '@fortawesome/free-solid-svg-icons';
import {
    FaceBookColor,
    LinkColor,
    SendIcon,
    ShareEmbedIcon,
    ShareIcon,
    TwitterColor,
    WhatsAppColor,
} from '../../../components/Icons';

const cx = classNames.bind(styles);

function Comment() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('account-wrapper')}>
                    <div className={cx('account')}>
                        <img
                            alt=""
                            className={cx('avatar')}
                            src="https://files.fullstack.edu.vn/f8-tiktok/users/5479/645864f59054b.jpg"
                        ></img>
                        <div className={cx('info')}>
                            <p className={cx('nick-name')}>hoanganh11024</p>
                            <p className={cx('name')}>Vũ Đặng Hoàng Anh · 2023-05-10</p>
                        </div>
                    </div>
                    <Button outline className={cx('follow-btn')}>
                        Follow
                    </Button>
                </div>

                <p className={cx('description')}>Description video</p>
                <Link to={'/'} className={cx('music-info')}>
                    {' '}
                    <FontAwesomeIcon className={cx('music-icon')} icon={faMusic} /> Nhạc nền - Vũ Đặng Hoàng Anh{' '}
                </Link>

                <div className={cx('interactive')}>
                    <div className={cx('interactive-top')}>
                        <div className={cx('activity-video')}>
                            <div className={cx('count-box')}>
                                <button className={cx('act-btn')}>
                                    <FontAwesomeIcon className={cx('act-icon')} icon={faHeart} />
                                </button>
                                <strong className={cx('count-number')}>5</strong>
                            </div>
                            <div className={cx('count-box')}>
                                <button className={cx('act-btn')}>
                                    <FontAwesomeIcon className={cx('act-icon')} icon={faComment} />
                                </button>
                                <strong className={cx('count-number')}>3</strong>
                            </div>
                        </div>
                        <div className={cx('social-media')}>
                            <ShareEmbedIcon className={cx('social-media-icon')} />
                            <LinkColor className={cx('social-media-icon')} />
                            <SendIcon className={cx('social-media-icon')} />
                            <FaceBookColor className={cx('social-media-icon')} />
                            <WhatsAppColor className={cx('social-media-icon')} />
                            <TwitterColor className={cx('social-media-icon')} />
                            <button className={cx('share-btn')}>
                                <ShareIcon className={cx('social-media-icon')} />
                            </button>
                        </div>
                    </div>
                    <div className={cx('link-box')}>
                        <p className={cx('link')}>https://tiktok.nghiane.online/#/video/2183</p>
                        <button className={cx('coppy-btn')}>Sao chép liên kết</button>
                    </div>
                </div>
            </div>
            <div className={cx('content')}>
                <div className={cx('comment-wrapper')}>
                    <p className={cx('empty')}>hãy là người đầu tiên bình luận</p>
                </div>
            </div>
            <div className={cx('footer')}>
                <div className={cx('login-btn')}>
                    <p>Đăng nhập để bình luận</p>
                </div>
            </div>
        </div>
    );
}

export default Comment;
