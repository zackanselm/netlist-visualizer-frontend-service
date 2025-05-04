/* eslint-disable max-len */
export interface RouteConfig {
    route: string;
    head: {
        title: string;
        description: string;
    },
    view: string;
}

const routeConfig: RouteConfig[] = [
    {
        route: '/',
        head: {
            title: 'Home',
            description: 'Upload a netlist to visualize and validate',
        },
        view: 'index',
    },
    {
        route: '/login',
        head: {
            title: 'Login',
            description: 'Upload a netlist to visualize and validate',
        },
        view: 'index',
    },
];

export default routeConfig;
