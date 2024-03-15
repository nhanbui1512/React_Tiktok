import { Routes, BrowserRouter, Route } from 'react-router-dom';

import { Home, Discovery, Profile } from './Pages';

import classNames from 'classnames/bind';
import styles from './MobileApp.module.scss';
import Footer from './Components/Footer';

const cx = classNames.bind(styles);

function Mobile() {
  return (
    <div className={cx('app')}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/discovery" element={<Discovery />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default Mobile;
