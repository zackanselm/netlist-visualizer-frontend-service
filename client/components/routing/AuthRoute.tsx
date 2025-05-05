/* eslint-disable no-nested-ternary */
import * as React from 'react';
import { RouteProps } from 'react-router-dom';
import RedirectWithStatus from './RedirectWithStatus';
import withNavigation from './withNavigation';

// interface IAuthRouteRouterProps {
// }
// eslint-disable-next-line @typescript-eslint/ban-types
type IAuthRouteProps = RouteProps & {
    component?: any;
    isAuthorized: boolean;
    location: string;
    redirectPath: string;
    render?: any;
};

const RouteComponent = (props: IAuthRouteProps) => (
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

class AuthRoute extends React.Component<IAuthRouteProps, any> {
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
