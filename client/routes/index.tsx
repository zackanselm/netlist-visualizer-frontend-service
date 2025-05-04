import * as React from 'react';
import { RouteObject } from 'react-router-dom';
// import { AuthRoute } from '../redux/routing';
import LoginPage from './LoginPage';

export type IRoute = RouteObject & {
    redirectPath?: string;
}

export interface IRoutePropsConfig {
    isAuthorized: Function
}

const getRoutes = (routePropsConfig: IRoutePropsConfig): IRoute[] => [
    // {
    //     path: '/',
    //     element: <AuthRoute
    //         component={LoginPage}
    //         // isAuthorized={routePropsConfig.isAuthorized()}
    //         // redirectPath={'/login'}
    //     />,
    // },
    {
        path: '/',
        element: <LoginPage />,
    },
    // {
    //     path: '/register',
    //     element: <Register />,
    // },

    // // If no route matches, return NotFound component
    // {
    //     path: '*',
    //     element: <PageNotFound />,
    // },
];

export default getRoutes;
