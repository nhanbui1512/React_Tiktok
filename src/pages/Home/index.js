import classNames from 'classnames/bind';
import styles from './home.module.scss';
import { useEffect, useContext, useState } from 'react';
import { ThemeContext } from '../../Context';
import { getCookie } from '../../service/local/cookie';
import * as VideoServices from '../../service/videoServices';
import InfiniteScroll from 'react-infinite-scroll-component';
import Post from '../../components/Post/post';
import Loading from '../../components/Loading';
import { Route, Routes } from 'react-router-dom';
import Video from '../Video';

const cx = classNames.bind(styles);
function Home() {
    const [items, setItems] = useState([]); // Dữ liệu hiện tại
    const [hasMore, setHasMore] = useState(true); // Có thêm dữ liệu để load không
    const [page, setPage] = useState(Math.floor(Math.random() * 10) + 1); // Số trang hiện tại
    const context = useContext(ThemeContext);

    const fetchMoreData = () => {
        // Thực hiện logic để lấy dữ liệu mới ở đây, ví dụ:
        // Gọi API hoặc thao tác với dữ liệu đã có

        // Sau khi lấy được dữ liệu mới, cập nhật state items
        // và kiểm tra xem còn dữ liệu nữa không

        const authToken = getCookie('authToken') || '';
        VideoServices.getVideos({ type: 'for-you', page: page, token: authToken })
            .then((data) => {
                setItems((prevItems) => [...prevItems, ...data]);
                page === 1 ? context.setListVideo(data) : context.setListVideo((prevState) => [...prevState, ...data]);
                // Nếu không có dữ liệu mới nữa, đặt hasMore thành false
                // Điều này sẽ ngăn người dùng cuộn để load thêm dữ liệu
                if (data.length === 0) {
                    setHasMore(false);
                }
                // Tăng số trang lên 1

                setPage((prevPage) => prevPage + 1);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // start
    useEffect(() => {
        window.scroll(0, 0);
        fetchMoreData();
    }, []);

    return (
        <div className={cx('container')}>
            <Routes>
                <Route path="/video/:id" key={100} element={<Video />} />
            </Routes>
            <InfiniteScroll
                dataLength={items.length} // Số lượng phần tử hiện tại trong danh sách dữ liệu
                next={fetchMoreData} // Callback được gọi khi người dùng cuộn đến cuối trang
                hasMore={hasMore} // Còn dữ liệu để load không
                loader={
                    <div className={cx('loader-container')}>
                        <Loading />
                    </div>
                } // Hiển thị loader khi đang tải dữ liệu
                // scrollThreshold={'200px'}
            >
                {/* Hiển thị danh sách dữ liệu */}
                {items.map((item, index) => (
                    <Post
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
export default Home;
