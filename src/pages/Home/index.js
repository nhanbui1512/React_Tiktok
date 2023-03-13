import classNames from 'classnames/bind';
import styles from './home.module.scss';
import Post from '../../components/Post';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('container')}>
            <div className={cx('content')}>
                <Post></Post>
            </div>
        </div>
    );
}
export default Home;
