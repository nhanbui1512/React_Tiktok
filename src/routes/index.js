import config from '../config';
// Layout
import { HeaderOnly, ProfileLayout } from '../Layout';

// Page
import Home from '../pages/Home';
import Following from '../pages/Following';
import Profile from '../pages/Profile';
import Upload from '../pages/Upload';
import Search from '../pages/Search';
import Live from '../pages/Live';
import Login from '../pages/Login';
import Signup from '../pages/Signup';

// Khong can dang nhap
const publicRoutes = [
    { path: config.routes.root, component: Home },
    { path: config.routes.following, component: Following },
    { path: config.routes.live, component: Live },
    { path: config.routes.profile, component: Profile, layout: ProfileLayout },
    { path: config.routes.upload, component: Upload, layout: HeaderOnly },
    { path: config.routes.search, component: Search, layout: null },
    { path: config.routes.login, component: Login, layout: null },
    { path: config.routes.signup, component: Signup, layout: null },
];

// Can dang nhap
const privateRoutes = [];

export { publicRoutes, privateRoutes };
