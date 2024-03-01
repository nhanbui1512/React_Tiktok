import classNames from 'classnames/bind';
import styles from './ProfilePage.module.scss';
import ProfileInfo from './ProfileInfo';
import OwnVideos from './OwnVideos';

import * as UserService from '../../service/userServices';

import { Route, Routes, useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCookie } from '../../service/local/cookie';
import { useContext } from 'react';
import { ThemeContext } from '../../Context';
import Video from '../Video';

const cx = classNames.bind(styles);

function Profile() {
  window.scroll(0, 0);
  const location = useLocation();

  const context = useContext(ThemeContext);

  let { nickname } = useParams();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const token = getCookie('authToken') || '';
    UserService.getUser({ nickname, token: token })
      .then((data) => {
        setUserData(data.data);
        context.setListVideo(data.data.videos);
      })
      .catch((err) => {
        // console.log(err);
      });
    // eslint-disable-next-line
  }, [nickname]);

  return (
    <div className={cx('wrapper')}>
      <Routes>
        <Route
          key={1}
          path="/:id"
          element={<Video profile routeBack={`/${nickname}`} mainRoute={`/${nickname}`}></Video>}
        ></Route>
      </Routes>
      <ProfileInfo data={userData} />
      {userData.videos && <OwnVideos nickName={nickname} videos={userData.videos} userId={userData.id} />}

      {!location.pathname.startsWith('/@') && (
        <div
          style={{
            position: 'fixed',
            zIndex: 999,
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            backgroundColor: '#000',
            color: '#fff',
          }}
        >
          404 Not Found
        </div>
      )}
    </div>
  );
}
export default Profile;
