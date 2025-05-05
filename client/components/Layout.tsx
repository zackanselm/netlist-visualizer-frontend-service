import * as React from 'react';
import AppRoutes from './AppRoutes';


const Layout = () => {
    return (
        <div className="layout-container">
            <AppRoutes
                isAuthorized={() => true}
            />

            {/* <Alerts></Alerts> */}
            {/* <Loader></Loader> */}
        </div>
    );
}

export default Layout;
