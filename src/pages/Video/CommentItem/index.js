import classNames from 'classnames/bind';
import styles from './CommentItem.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faHeart, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import Image from '../../../components/Image';
import { useRef, useState } from 'react';
import { likeComment, unLikeComment } from '../../../service/likeService';
import { getCookie } from '../../../service/local/cookie';
import { EllipseIcon } from '../../../components/Icons';
import Menu from '../../../components/Popper/Menu';

const cx = classNames.bind(styles);

function CommentItem({ data = {}, dark = false, isOwner = false }) {
    const [isLiked, setIsLiked] = useState(data.is_liked);
    const countRef = useRef();

    const handleLike = () => {
        const authToken = getCookie('authToken') || '';

        isLiked === false
            ? likeComment({ idComment: data.id, token: authToken })
                  .then((res) => {
                      countRef.current.innerText = res.data.likes_count;
                  })
                  .catch((err) => {
                      console.log(err);
                  })
            : unLikeComment({ idComment: data.id, token: authToken })
                  .then((res) => {
                      countRef.current.innerText = res.data.likes_count;
                  })
                  .catch((err) => {
                      console.log(err);
                  });

        setIsLiked(!isLiked);
    };

    // nếu là chủ sở hữu comment thì được xóa
    const items =
        isOwner === true
            ? [
                  {
                      icon: <FontAwesomeIcon icon={faFlag}></FontAwesomeIcon>,
                      title: 'Báo cáo',
                  },
                  {
                      icon: <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>,
                      title: 'Xóa',
                  },
              ]
            : [
                  {
                      icon: <FontAwesomeIcon icon={faFlag}></FontAwesomeIcon>,
                      title: 'Báo cáo',
                  },
              ];

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
                <Menu delayHidden={200} primary={true} items={items}>
                    <div className={cx('more-btn')}>
                        <EllipseIcon className={cx('more-icon')} />
                    </div>
                </Menu>

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
