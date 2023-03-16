import classNames from 'classnames/bind';
import styles from './home.module.scss';
import ListVideoBox from '../../components/ListVideoBox/listVideoBox';

const cx = classNames.bind(styles);

function Home() {
    window.scrollTo(0, 0);
    return (
        <div className={cx('container')}>
            <ListVideoBox />
        </div>
    );
}
export default Home;
