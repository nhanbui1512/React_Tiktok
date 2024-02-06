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
import Loading from '../../../components/loading';
import { useParams } from 'react-router-dom';
const cx = classNames.bind(styles);

function LikedVideos({ userId }) {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const context = useContext(ThemeContext);
  const [isFetching, setIsFetching] = useState(false);

  let { nickname } = useParams();

  const fetchMoreData = () => {
    const authToken = getCookie('authToken') || '';

    if (context.currentUser === true) {
      setIsFetching(true);
      getVideosUserLiked({ idUser: userId, page: page, token: authToken })
        .then((res) => {
          setItems((prevItems) => [...prevItems, ...res.data]);
          page === 1
            ? context.setListVideo(res.data)
            : context.setListVideo((prevState) => [...prevState, ...res.data]);

          if (res.data.length === 0) {
            setHasMore(false);
          }

          setPage((prevPage) => prevPage + 1);
          setIsFetching(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // start
  useEffect(() => {
    fetchMoreData();
    // eslint-disable-next-line
  }, [context.currentUser]);

  return (
    <div className={cx('wrapper')}>
      <div>
        <InfiniteScroll className={cx('container')} dataLength={items.length} next={fetchMoreData} hasMore={hasMore}>
          {items.map((video) => {
            return <VideoItem nickName={nickname} data={video} key={video.id} />;
          })}
        </InfiniteScroll>
        {isFetching && (
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
