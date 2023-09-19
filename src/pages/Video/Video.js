import styles from './Video.module.scss';
import classNames from 'classnames/bind';

import Comment from './Comment';

import { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../../Context';
//service
import { getCommentsOfVieo } from '../../service/commentService';
import { getCookie } from '../../service/local/cookie';
import { useParams } from 'react-router-dom';
import VideoPlayer from './VideoPlayer';
import { getOneVideo } from '../../service/videoServices';

const cx = classNames.bind(styles);

function Video({ routeBack = '/', mainRoute = '', profile = false }) {
    const context = useContext(ThemeContext);

    const [index] = useState(0);

    let { id } = useParams();
    const [meta, setMeta] = useState(context.listVideo[index]);
    const [comments, setComments] = useState([]);

    // fetch comments
    useEffect(() => {
        const token = getCookie('authToken') || '';
        const idVideo = id;
        context.currentUser &&
            getCommentsOfVieo({ idVideo: idVideo, token: token, page: 1 }).then((res) => {
                setComments(res.data.data);
            });

        getOneVideo({ idVideo: id, token: token })
            .then((res) => {
                setMeta(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id, context.currentUser]);

    return (
        <div className={cx(['wrapper', context.theme])}>
            <VideoPlayer routeBack={routeBack} mainRoute={mainRoute} profile={profile} />
            <div className={cx('comment-wrapper')}>
                <Comment data={meta} comments={comments} />
            </div>
        </div>
    );
}
export default Video;
