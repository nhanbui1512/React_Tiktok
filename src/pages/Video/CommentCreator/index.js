import classNames from 'classnames/bind';
import styles from './CommentCreator.module.scss';
import EmojiPicker from 'emoji-picker-react';
import Tippy from '@tippyjs/react';
import { EmojiIcon } from '../../../components/Icons';
import { useState } from 'react';
const cx = classNames.bind(styles);

function CommentCreator({ theme = 'light' }) {
    const [emojiBox, setEmojiBox] = useState(false);
    const [valueComment, setValueComment] = useState('');

    return (
        <div className={cx(['wrapper', theme])}>
            <div className={cx('creator-form')}>
                <div className={cx('input-container')}>
                    <textarea
                        value={valueComment}
                        rows="1"
                        className={cx('input-comment')}
                        placeholder="Thêm bình luận..."
                        spellCheck={false}
                        onChange={(e) => {
                            setValueComment(e.target.value);
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
                                    setValueComment(valueComment + emoji.emoji);
                                }}
                                searchDisabled={true}
                                height={400}
                                width={364}
                                emojiStyle="twitter"
                            />{' '}
                        </div>
                    )}
                </div>
                <button className={cx('comment_btn')}>
                    <span>Đăng</span>
                </button>
            </div>
        </div>
    );
}

export default CommentCreator;
