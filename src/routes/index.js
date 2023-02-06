import config from '../config';
// Layout
import { HeaderOnly } from '../Layout';

// Page
import Home from '../pages/Home';
import Following from '../pages/Following';
import Profile from '../pages/Profile';
import Upload from '../pages/Upload';
import Search from '../pages/Search';

// Khong can dang nhap
const publicRoutes = [
    { path: config.routes.root, component: Home },
    { path: config.routes.following, component: Following },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.upload, component: Upload, layout: HeaderOnly },
    { path: config.routes.search, component: Search, layout: null },
];

// Can dang nhap
const privateRoutes = [];

export { publicRoutes, privateRoutes };
