import classNames from 'classnames/bind';
import styles from './CommentCreator.module.scss';
import EmojiPicker from 'emoji-picker-react';
import Tippy from '@tippyjs/react';
import { EmojiIcon } from '../../../components/Icons';
import { useState } from 'react';
import { createNewComment } from '../../../service/commentService';
import { getCookie } from '../../../service/local/cookie';
const cx = classNames.bind(styles);

function CommentCreator({ setCommentList, theme = 'light', idVideo }) {
    const [emojiBox, setEmojiBox] = useState(false);
    const [commentValue, setCommentValue] = useState('');

    const handleComment = () => {
        const token = getCookie('authToken') || '';
        createNewComment({ token, idVideo: idVideo, content: commentValue })
            .then((res) => {
                setCommentList((prevState) => [res.data, ...prevState]);
                setCommentValue('');
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div className={cx(['wrapper', theme])}>
            <div className={cx('creator-form')}>
                <div className={cx('input-container')}>
                    <textarea
                        value={commentValue}
                        rows="1"
                        className={cx('input-comment')}
                        placeholder="Thêm bình luận..."
                        spellCheck={false}
                        onChange={(e) => {
                            setCommentValue(e.target.value);
                        }}
                        onBlur={() => {
                            setEmojiBox(false);
                        }}
                    ></textarea>

                    <Tippy content="Nhấp để thêm Emoji">
                        <div
                            className={cx('emoji-btn')}
                            onClick={() => {
                                setEmojiBox(!emojiBox);
                            }}
                        >
                            <EmojiIcon className={cx('emoji-icon')} />
                        </div>
                    </Tippy>
                    {emojiBox && (
                        <div className={cx('emoji-box')}>
                            <EmojiPicker
                                onEmojiClick={(emoji) => {
                                    setCommentValue(commentValue + emoji.emoji);
                                    setEmojiBox(false);
                                }}
                                searchDisabled={true}
                                height={400}
                                width={364}
                                emojiStyle="twitter"
                            />{' '}
                        </div>
                    )}
                </div>
                <button className={cx('comment_btn')} onClick={handleComment}>
                    <span>Đăng</span>
                </button>
            </div>
        </div>
    );
}

export default CommentCreator;
