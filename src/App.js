import { Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import { DefaultLayout } from './Layout';

import { ThemeContext } from './Context';
import { useContext } from 'react';
import NotiBar from './components/NotiBar';

function App() {
    const context = useContext(ThemeContext);

    return (
        <BrowserRouter>
            <div className={`App ${context.theme}`}>
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else {
                            if (route.layout === null) {
                                Layout = Fragment;
                            }
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            ></Route>
                        );
                    })}
                </Routes>
                {context.notiLoginSuccess && <NotiBar> Đăng nhập thành công</NotiBar>}
            </div>
        </BrowserRouter>
    );
}

export default App;
