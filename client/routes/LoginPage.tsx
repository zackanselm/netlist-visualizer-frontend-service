import * as React from 'react';
import { useContext } from 'react';
import { Paper, Button, Group, TextInput, Container } from '@mantine/core';
import { useForm } from '@mantine/form';
import { NavigateFunction } from 'react-router-dom';
import MainContext from '../store/MainContext';
import UsersService, { LoginInputs } from '../services/UsersService';
import withNavigation from '../components/routing/withNavigation';

interface LoginPageRouterProps {
    location: Location;
    navigation: {
        navigate: NavigateFunction;
    }
}

interface LoginPageProps extends LoginPageRouterProps {};

const LoginPage = ({ navigation }: LoginPageProps) => {
    const form = useForm({
        mode: 'controlled',
        initialValues: {
          email: '',
        },
    
        validate: {
          email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });

    const { updateUserEmail, userEmail }: any = useContext(MainContext);

    const onLogin = (userDetails: LoginInputs) => {
        UsersService.login(userDetails).then(() => {
            updateUserEmail(userDetails.email);
            navigation.navigate('/')
        });
    }

    return (
        <div className="page">
            <Container size={480} mt="xl">
                <Paper shadow="sm" p="xl" withBorder>
                    <form onSubmit={form.onSubmit(onLogin)}>
                        <TextInput
                            label="Email"
                            placeholder="your@email.com"
                            key={form.key('email')}
                            {...form.getInputProps('email')}
                            mb="md"
                            required
                        />
                        {/* <Button style={{ height: 30 }} onSubmit={()}>
                            Login
                        </Button> */}

                        <Group justify="flex-end" mt="md">
                            <Button type="submit">Submit</Button>
                        </Group>
                    </form>
                </Paper>
            </Container>
            
        </div>
    )
}

export default React.memo(withNavigation(LoginPage));