import classNames from 'classnames/bind';
import styles from './post.module.scss';
import { Link } from 'react-router-dom';
import Image from '../Image';

const cx = classNames.bind(styles);

function Post() {
    return (
        <div className={cx('wrapper')}>
            <Link to="/profile">
                <Image className={cx('avatar')} src="" alt=""></Image>
            </Link>
            <div className={cx('video_content')}>
                <div className={cx('video_heaer')}>
                    <div className={cx('user_profile')}>
                        <Link>
                            <h3>sinema.era.1</h3>
                            <h4>🍿Sinema.era🍿</h4>
                        </Link>

                        <div className={cx('video_hastags')}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;
