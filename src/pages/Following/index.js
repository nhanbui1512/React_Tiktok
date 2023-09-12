import classNames from 'classnames/bind';
import styles from './following.module.scss';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { ThemeContext } from '../../Context';
import { getCookie } from '../../service/local/cookie';
import * as VideoServices from '../../service/videoServices';
import InfiniteScroll from 'react-infinite-scroll-component';
import Post from '../../components/Post';
import Video from '../Video';
import Loading from '../../components/Loading';

const cx = classNames.bind(styles);

function Following() {
    const [items, setItems] = useState([]); // Dữ liệu hiện tại
    const [hasMore, setHasMore] = useState(true); // Có thêm dữ liệu để load không
    const [page, setPage] = useState(1); // Số trang hiện tại
    const context = useContext(ThemeContext);

    const navigate = useNavigate();

    const fetchMoreData = () => {
        const authToken = getCookie('authToken') || '';
        VideoServices.getFollowingVideos({ page: page, token: authToken })
            .then((data) => {
                setItems((prevItems) => [...prevItems, ...data]);
                context.setListVideo((prevState) => [...prevState, ...data]);
                if (data.length === 0) {
                    setHasMore(false);
                }
                setPage((prevPage) => prevPage + 1);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        window.scroll(0, 0);
        const authToken = getCookie('authToken') || '';
        if (!authToken) {
            navigate('/login');
        } else {
            fetchMoreData();
        }
    }, []);
    return (
        <div className={cx('container')}>
            <Routes>
                <Route path="/video/:id" key={100} element={<Video routeBack="/following" />} />
            </Routes>
            <InfiniteScroll
                dataLength={items.length} // Số lượng phần tử hiện tại trong danh sách dữ liệu
                next={fetchMoreData} // Callback được gọi khi người dùng cuộn đến cuối trang
                hasMore={hasMore} // Còn dữ liệu để load không
                loader={
                    <div className={cx('loader-container')}>
                        <Loading />
                    </div>
                }
            >
                {items.map((item, index) => (
                    <Post
                        route="/following"
                        key={index}
                        data={item}
                        volumeValue={context.volume}
                        ChangeVolumeGlobal={context.setVolume}
                    ></Post>
                ))}
            </InfiniteScroll>
        </div>
    );
}
export default Following;
