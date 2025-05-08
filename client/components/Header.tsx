import { UnstyledButton } from '@mantine/core';
import * as React from 'react';
import { NavigateFunction, RouteProps } from 'react-router-dom';
import UsersService from '../services/UsersService';
import MainContext from '../store/MainContext';
import withNavigation from './routing/withNavigation';

interface HeaderRouterProps {
    navigation: {
        navigate: NavigateFunction;
    }
}

interface HeaderProps extends HeaderRouterProps {
    isAuthorized: boolean;
    
}

const Header = ({ isAuthorized, navigation }: HeaderProps) => {
    const { updateUserEmail, updateUserId, getAllSubmissions }: any = React.useContext(MainContext);

    const onLogout = () => {
        UsersService.logout().then(() => {
            updateUserEmail('');
            updateUserId('');
            getAllSubmissions([]);
            navigation.navigate('/')
        });
    }

    return (
        <header className="header">
            <div>
                Netlist Visualizer
            </div>
            <div></div>
            <div>
                {
                isAuthorized &&
                <UnstyledButton component="button" onClick={onLogout}>
                    Logout
                </UnstyledButton>
                }
            </div>
        </header>
    )
};

export default withNavigation(Header);
