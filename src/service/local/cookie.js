export const setToken = ({ token }) => {
    // Thay thế "your_auth_token" bằng mã thông báo của bạn
    const authToken = token;

    // Tạo cookie với tên "authToken" và giá trị là mã thông báo của bạn
    document.cookie = `authToken=${authToken}; path=/; Secure`;
};
