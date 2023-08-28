import classNames from 'classnames/bind';
import styles from './home.module.scss';
import ListVideoBox from '../../components/ListVideoBox/listVideoBox';
import { useEffect, useContext, useState } from 'react';
import { ThemeContext } from '../../Context';
import { getCookie } from '../../service/local/cookie';
import * as VideoServices from '../../service/videoServices';
const cx = classNames.bind(styles);

function Home() {
    const [videos, setVideos] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [page, setPage] = useState(1);
    const [volume, SetVolume] = useState(40);

    const authToken = getCookie('authToken') || '';

    const [isMuted, setIsMuted] = useState(true);

    const context = useContext(ThemeContext);

    const handleScroll = () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;

        if (scrollTop + clientHeight >= scrollHeight) {
            setIsFetching(true);
        }
    };

    const ChangeVolumeGlobal = ({ volumeValue }) => {
        SetVolume(volumeValue);
    };

    const SetMuteGlobal = () => {
        setIsMuted(!isMuted);
    };

    const fetchMoreListItems = () => {
        VideoServices.getVideos({ type: 'for-you', page: page + 1, token: authToken })
            .then((data) => {
                setVideos((prevState) => [...prevState, ...data]);
                context.setListVideo((prevState) => [...prevState, ...data]);
            })
            .then(() => {
                setPage(page + 1);
                setIsFetching(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // start
    useEffect(() => {
        VideoServices.getVideos({ type: 'for-you', page: page, token: authToken })
            .then((data) => {
                setVideos(data);
                context.setListVideo(data);
            })
            .catch((err) => {
                console.log(err);
            });

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [authToken]);

    useEffect(() => {
        if (!isFetching) return;
        setTimeout(() => {
            fetchMoreListItems();
        }, 500);
    }, [isFetching]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={cx('container')}>
            <ListVideoBox
                volume={volume}
                videos={videos}
                isFetching={isFetching}
                isMuted={isMuted}
                ChangeVolumeGlobal={ChangeVolumeGlobal}
                SetMuteGlobal={SetMuteGlobal}
            />
        </div>
    );
}
export default Home;
