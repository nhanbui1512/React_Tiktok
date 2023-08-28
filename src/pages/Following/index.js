import classNames from 'classnames/bind';
import styles from './following.module.scss';
import { useNavigate } from 'react-router-dom';
import ListVideoBox from '../../components/ListVideoBox/listVideoBox';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Following() {
    const navigate = useNavigate();
    const [videos, setVideos] = useState([]);
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const authToken = localStorage.getItem('authToken') || getCookie('authToken');

    useEffect(() => {
        if (!authToken) {
            navigate('/login');
        }
    });
    return (
        <div className={cx('container')}>
            <ListVideoBox videos={videos} />
        </div>
    );
}
export default Following;
