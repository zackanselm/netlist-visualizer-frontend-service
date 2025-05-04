import * as React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import MainContextProvider from './store/MainContextProvider';

// Third Party Styles
// import 'react-datetime/css/react-datetime.css';

import './styles/root.scss';

const rootEl: any = document.getElementById('app');

// const root = createRoot(rootEl);
const RootComponent = () => (
    <MainContextProvider>
        <BrowserRouter>
            {/* TODO: Create a Layout componenet that renders react routes */}
            Hello, React
        </BrowserRouter>
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
