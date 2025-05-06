import * as React from 'react';
import { useContext } from 'react';
import AppRoutes from './AppRoutes';
import MainContext from '../store/MainContext';
import Header from '../components/Header';


const Layout = () => {
    const { userEmail }: any = useContext(MainContext)
    const isAuthorized = () => !!userEmail;
    const isLoggedIn = isAuthorized();

    return (
        <div className="layout-container">
            <Header isAuthorized={isLoggedIn} />
            <AppRoutes
                isAuthorized={isAuthorized}
            />

            {/* <Alerts></Alerts> */}
            {/* <Loader></Loader> */}
        </div>
    );
}

export default Layout;
