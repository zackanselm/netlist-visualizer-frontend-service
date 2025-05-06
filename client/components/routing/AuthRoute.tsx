/* eslint-disable no-nested-ternary */
import * as React from 'react';
import { RouteProps } from 'react-router-dom';
import RedirectWithStatus from './RedirectWithStatus';
import withNavigation from './withNavigation';

type AuthRouteProps = RouteProps & {
    component?: any;
    isAuthorized: boolean;
    location: string;
    redirectPath: string;
    render?: any;
};

const RouteComponent = (props: AuthRouteProps) => (
    props.isAuthorized
        ? (
            props.render ? props.render(props) : <props.component {...props}/>
        )
        : (
            <RedirectWithStatus
                statusCode={307}
                to={{
                    pathname: props.redirectPath,
                }}
            />
        )
);

class AuthRoute extends React.Component<AuthRouteProps, any> {
    redirectPath = '/login';

    render() {
        const { redirectPath } = this.props;

        if (redirectPath) {
            this.redirectPath = redirectPath;
        }

        return (
            <RouteComponent { ...this.props } redirectPath={this.redirectPath} />
        );
    }
}

export default withNavigation(AuthRoute);
