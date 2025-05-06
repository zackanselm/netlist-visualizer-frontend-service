import * as React from 'react';
import { NavigateProps, Navigate } from 'react-router-dom';

interface RedirectWithStatusProps extends NavigateProps {
    statusCode: string | number;
}

const RedirectWithStatus = (props: RedirectWithStatusProps) => <Navigate to={props.to} replace />;

export default RedirectWithStatus;
