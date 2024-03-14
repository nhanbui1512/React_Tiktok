import classNames from 'classnames/bind';
import styles from './Comment.module.scss';
import Button from '../../../components/Button';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faMusic } from '@fortawesome/free-solid-svg-icons';
import Image from '../../../components/Image';
import {
  FaceBookColor,
  HeartIcon,
  HeartRedIcon,
  LinkColor,
  SendIcon,
  ShareEmbedIcon,
  ShareIcon,
  TwitterColor,
  WhatsAppColor,
} from '../../../components/Icons';

import MenuShare from '../../../components/MenuShare';
import CommentItem from '../CommentItem';
import { useContext, useEffect, useRef, useState } from 'react';
import { ThemeContext } from '../../../Context';
import CommentCreator from '../CommentCreator';

import { FollowUser, UnFollow } from '../../../service/userServices';
import { getCookie } from '../../../service/local/cookie';
import { likeVideo, unLikeVideo } from '../../../service/likeService';
const cx = classNames.bind(styles);

function Comment({ data = {}, comments = [] }) {
  const context = useContext(ThemeContext);
  const [isLiked, setIsLiked] = useState(data.is_liked || false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const countRef = useRef();
  var currentURL = window.location.href;
  const HandleFollow = () => {
    if (!context.currentUser) {
      context.setLoginPopper(true);
    } else {
      const token = getCookie('authToken') || '';

      isFollowed
        ? UnFollow({ token, idUser: data.user.id })
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            })
        : FollowUser({ token, idUser: data.user.id })
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });

      setIsFollowed(!isFollowed);
    }
  };

  const handleLikeVideo = () => {
    if (!context.currentUser) {
      context.setLoginPopper(true);
    } else {
      const token = getCookie('authToken') || '';
      if (isLiked === false) {
        likeVideo({ token, idVideo: data.id })
          .then((res) => {
            countRef.current.innerText = res.data.likes_count;
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        unLikeVideo({ token, idVideo: data.id })
          .then((res) => {
            countRef.current.innerText = res.data.likes_count;
          })
          .catch((err) => {
            console.log(err);
          });
      }
      setIsLiked(!isLiked);
    }
  };

  useEffect(() => {
    setCommentList(comments);
  }, [comments]);

  useEffect(() => {
    setIsLiked(data.is_liked);
    setIsFollowed(data.user.is_followed);
  }, [data]);

  return (
    <div className={cx(['wrapper', context.theme])}>
      <div className={cx('header')}>
        <div className={cx('account-wrapper')}>
          <div className={cx('account')}>
            {/* <img alt="" className={cx('avatar')} src={data.user.avatar}></img> */}
            <Image className={cx('avatar')} src={data.user.avatar} />

            <div className={cx('info')}>
              <Link className={cx('nick-name')} to={`/@${data.user.nickname}`}>
                <p>{data.user.nickname}</p>
              </Link>
              <p className={cx('name')}>
                {`${data.user.first_name} ${data.user.last_name}`} · {data.published_at.split(' ')[0]}
              </p>
            </div>
          </div>
          <Button outline className={cx('follow-btn')} onClick={HandleFollow}>
            {isFollowed === false ? `Follow` : `Unfollow`}
          </Button>
        </div>

        <p className={cx('description')}>{data.description}</p>
        <Link to={'/'} className={cx('music-info')}>
          <FontAwesomeIcon className={cx('music-icon')} icon={faMusic} /> {data.music}
        </Link>

        <div className={cx('interactive')}>
          <div className={cx('interactive-top')}>
            <div className={cx('activity-video')}>
              <div className={cx('count-box')}>
                <button className={cx('act-btn')} onClick={handleLikeVideo}>
                  {isLiked === true ? (
                    <HeartRedIcon className={cx('act-icon')} />
                  ) : (
                    <HeartIcon fill={context.theme === 'dark' ? '#fff' : '#000'} className={cx('act-icon')} />
                  )}
                </button>
                <strong ref={countRef} className={cx('count-number')}>
                  {data.likes_count}
                </strong>
              </div>
              <div className={cx('count-box')}>
                <button className={cx('act-btn')}>
                  <FontAwesomeIcon className={cx('act-icon')} icon={faCommentDots} />
                </button>
                <strong className={cx('count-number')}>{data.comments_count}</strong>
              </div>
            </div>
            <div className={cx('social-media')}>
              <ShareEmbedIcon className={cx('social-media-icon')} />
              <LinkColor className={cx('social-media-icon')} />
              <SendIcon className={cx('social-media-icon')} />
              <FaceBookColor className={cx('social-media-icon')} />
              <WhatsAppColor className={cx('social-media-icon')} />
              <TwitterColor className={cx('social-media-icon')} />

              <MenuShare offset={[0, 15]}>
                <button className={cx('share-btn')}>
                  <ShareIcon
                    fill={context.theme === 'dark' ? '#fff' : 'currentColor'}
                    className={cx('social-media-icon')}
                  />
                </button>
              </MenuShare>
            </div>
          </div>
          <div className={cx('link-box')}>
            <p className={cx('link')}>{currentURL}</p>
            <button className={cx('coppy-btn')}>Sao chép liên kết</button>
          </div>
        </div>
      </div>
      <div className={cx('content')}>
        <div className={cx('comment-wrapper')}>
          {commentList.length > 0 || <p className={cx('empty')}>Hãy là người đầu tiên bình luận</p>}
          {commentList.map((item) => {
            return (
              <CommentItem
                setCommentList={setCommentList}
                isOwner={item.user.id === context.user.id}
                dark={context.theme === 'dark' && true}
                data={item}
                key={item.id}
              />
            );
          })}
        </div>
      </div>
      <div className={cx('footer')}>
        {context.currentUser ? (
          <CommentCreator idVideo={data.id} setCommentList={setCommentList} theme={context.theme} />
        ) : (
          <div className={cx('login-btn')}>
            <p
              onClick={() => {
                context.setLoginPopper(true);
              }}
            >
              Đăng nhập để bình luận
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Comment;
