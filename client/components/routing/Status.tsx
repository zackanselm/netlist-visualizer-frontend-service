import * as React from 'react';
import { Route } from 'react-router-dom';

interface StatusProps {
    children: React.ReactNode;
    statusCode: any;
}

class Status extends React.Component<StatusProps, any> {
    render() {
        const { children, statusCode } = this.props;

        const RouteComponent = ({ staticContext }: any) => {
            if (staticContext) {
                staticContext.statusCode = statusCode;
            }
            return <>{children}</>;
        };

        return (<Route element={<RouteComponent />} />);
    }
}

export default Status;
