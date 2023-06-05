import classNames from 'classnames/bind';
import styles from './Discovery.module.scss';
import { HashTagIcon, MusicNoteIcon } from '../Icons';
import { useContext } from 'react';
import { ThemeContext } from '../../Context';

import DiscoveryItem from './DiscoveryItem/DiscoveryItem';

const cx = classNames.bind(styles);

function Discovery() {
    const context = useContext(ThemeContext);

    return (
        <div className={cx(['wrapper', context.theme])}>
            <h2 className={cx('header')}>Discovery</h2>
            <div className={cx('body')}>
                <DiscoveryItem icon={<HashTagIcon />}>suthatla</DiscoveryItem>
                <DiscoveryItem icon={<HashTagIcon />}>mackedoi</DiscoveryItem>
                <DiscoveryItem icon={<HashTagIcon />}>sansangthaydoi</DiscoveryItem>
                <DiscoveryItem icon={<MusicNoteIcon />}>
                    Yêu Đơn Phương Là Gì (MEE Remix) - Mee Media & h0n & BHMedia
                </DiscoveryItem>
                <DiscoveryItem icon={<MusicNoteIcon />}>Thiên Thần Tình Yêu - RICKY STAR ạnd T.R.I</DiscoveryItem>
                <DiscoveryItem icon={<MusicNoteIcon />}>Tình Đã Đầy Một Tim - Huyền Tâm Môn</DiscoveryItem>
            </div>
        </div>
    );
}

export default Discovery;
