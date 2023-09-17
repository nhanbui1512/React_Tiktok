import classNames from 'classnames/bind';
import styles from './CommentItem.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import Image from '../../../components/Image';
import { useRef, useState } from 'react';
import { likeComment } from '../../../service/likeService';
import { getCookie } from '../../../service/local/cookie';

const cx = classNames.bind(styles);

function CommentItem({ data = {}, dark = false }) {
    const [isLiked, setIsLiked] = useState(data.is_liked);
    const countRef = useRef();

    const handleLike = () => {
        const authToken = getCookie('authToken') || '';
        likeComment({ idComment: data.id, token: authToken })
            .then((res) => {
                countRef.current.innerText = res.data.likes_count;
            })
            .catch((err) => {
                console.log(err);
            });
        setIsLiked(!isLiked);
    };

    return (
        <div
            className={cx('wrapper', {
                dark,
                isLiked,
            })}
        >
            <Link className={cx('avatar')}>
                {/* <img src={data.user.avatar} alt=""></img> */}
                <Image src={data.user.avatar} alt="" />
            </Link>
            <div className={cx('infor')}>
                <Link to={`/@${data.user.nickname}`} className={cx('username')}>
                    {data.user.first_name} {data.user.last_name}
                </Link>

                <p className={cx('content')}>{data.comment}</p>
                <p className={cx('others')}>
                    <span className={cx('time')}>{data.created_at.split(' ')[0]}</span>
                    <span className={cx('reply-btn')}>Trả lời</span>
                </p>
            </div>
            <div className={cx('act-container')}>
                <span
                    onClick={() => {
                        handleLike();
                    }}
                >
                    <FontAwesomeIcon className={cx('heart-icon')} icon={isLiked ? faHeartSolid : faHeart} />
                </span>
                <span ref={countRef} className={cx('count')}>
                    {data.likes_count}
                </span>
            </div>
        </div>
    );
}

export default CommentItem;
