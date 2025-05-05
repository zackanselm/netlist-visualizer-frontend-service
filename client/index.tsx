import * as React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import MainContextProvider from './store/MainContextProvider';

// Third Party Styles
// import 'react-datetime/css/react-datetime.css';
import '@mantine/core/styles.css';

import './styles/root.scss';
import Layout from './components/Layout';

const rootEl: any = document.getElementById('app');

// const root = createRoot(rootEl);
const RootComponent = () => (
    <MainContextProvider>
        <MantineProvider>
            <BrowserRouter>
                <Layout />
            </BrowserRouter>
        </MantineProvider>
    </MainContextProvider>
);

if (process.env.NODE_ENV === 'development') {
    createRoot(rootEl).render(<RootComponent />);
} else {
    hydrateRoot(
        rootEl,
        <RootComponent />,
    );
}
