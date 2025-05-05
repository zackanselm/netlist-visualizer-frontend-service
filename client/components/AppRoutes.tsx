import * as React from 'react';
import { useRoutes } from 'react-router-dom';
import getRoutes, { IRoutePropsConfig } from '../routes';

const AppRoutes = ({ isAuthorized }: IRoutePropsConfig) => (
    useRoutes(
        getRoutes({
            isAuthorized,
        }),
    )
);

export default AppRoutes;
