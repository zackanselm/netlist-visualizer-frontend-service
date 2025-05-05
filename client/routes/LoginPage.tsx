import * as React from 'react';
import { Card, Button } from '@mantine/core';

const LoginPage = () => {
    return (
        <div>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                Hello, world!
                <Button style={{ height: 30 }}>
                    Login
                </Button>
            </Card>
        </div>
    )
}

export default LoginPage;