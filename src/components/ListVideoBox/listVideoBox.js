import classNames from 'classnames/bind';
import styles from './listVideoBox.module.scss';

import Post from '../Post';
import Loading from '../Loading';
import { useContext } from 'react';
import { ThemeContext } from '../../Context';

const cx = classNames.bind(styles);
function ListVideoBox({ videos, isFetching }) {
    const context = useContext(ThemeContext);

    return (
        <div className={cx('content')}>
            {videos.map((item, index) => {
                return (
                    <Post
                        key={index}
                        data={item}
                        volumeValue={context.volume}
                        ChangeVolumeGlobal={context.setVolume}
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
