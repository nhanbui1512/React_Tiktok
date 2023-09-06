import classNames from 'classnames/bind';
import styles from './likedVideo.module.scss';
import { useContext, useEffect, useState } from 'react';

import VideoItem from '../VideoItem';
import { getVideosUserLiked } from '../../../service/videoServices';
import { ThemeContext } from '../../../Context';
import { UserIcon } from '../../../components/Icons';
import MainDetail from '../MainDetail';

import { getCookie } from '../../../service/local/cookie';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from '../../../components/Loading';
const cx = classNames.bind(styles);

function LikedVideos({ userId }) {
    const [items, setItems] = useState([]); // Dữ liệu hiện tại
    const [hasMore, setHasMore] = useState(true); // Có thêm dữ liệu để load không
    const [page, setPage] = useState(1); // Số trang hiện tại
    const context = useContext(ThemeContext);

    const fetchMoreData = () => {
        // Thực hiện logic để lấy dữ liệu mới ở đây, ví dụ:
        // Gọi API hoặc thao tác với dữ liệu đã có

        // Sau khi lấy được dữ liệu mới, cập nhật state items
        // và kiểm tra xem còn dữ liệu nữa không

        const authToken = getCookie('authToken') || '';
        getVideosUserLiked({ idUser: userId, page: page, token: authToken })
            .then((res) => {
                setItems((prevItems) => [...prevItems, ...res.data]);
                context.setListVideo((prevState) => [...prevState, ...res.data]);
                // Nếu không có dữ liệu mới nữa, đặt hasMore thành false
                // Điều này sẽ ngăn người dùng cuộn để load thêm dữ liệu
                if (res.data.length === 0) {
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
        fetchMoreData();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div>
                <InfiniteScroll
                    className={cx('container')}
                    dataLength={items.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                >
                    {items.map((video) => {
                        return <VideoItem data={video} key={video.id} />;
                    })}
                </InfiniteScroll>
                {hasMore && (
                    <div className={cx('loader')}>
                        <Loading />
                    </div>
                )}
            </div>
            {context.currentUser || (
                <MainDetail
                    icon={UserIcon}
                    title="Đây là tài khoản riêng tư"
                    desc="Hãy Follow tài khoản này để xem nội dung và các lượt thích của họ"
                    userIcon={true}
                />
            )}
        </div>
    );
}

export default LikedVideos;
