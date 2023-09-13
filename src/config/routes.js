const routes = {
    root: '/*',
    profile: '/:nickname',
    following: '/following/*',
    upload: '/upload',
    search: '/search',
    live: '/live',
    login: '/login/*',
    signup: '/signup/*',
    setting: '/settings',
    videoProfile: '/:nickname/videos/*',
};
export default routes;
