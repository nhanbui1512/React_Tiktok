import classNames from 'classnames/bind';
import styles from './listVideoBox.module.scss';

import Post from '../Post';
import Loading from '../Loading';

const cx = classNames.bind(styles);
function ListVideoBox({ ChangeVolumeGlobal, SetMuteGlobal, videos, isMuted, isFetching, volume }) {
    return (
        <div className={cx('content')}>
            {videos.map((item, index) => {
                return (
                    <Post
                        isMuted={isMuted}
                        key={index}
                        data={item}
                        volumeValue={volume}
                        ChangeVolumeGlobal={ChangeVolumeGlobal}
                        SetMuteGlobal={SetMuteGlobal}
                    ></Post>
                );
            })}

            {isFetching && (
                <div className={cx('spinner-container')}>
                    <Loading></Loading>
                </div>
            )}
        </div>
    );
}

export default ListVideoBox;
